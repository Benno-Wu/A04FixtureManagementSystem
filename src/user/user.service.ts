import { ClassSerializerInterceptor, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './entities/user.dto';
import { User } from './entities/user.entity';
import { getUuid, cryptoPass, Paged } from "../utils";
import { RedisService } from 'nestjs-redis';

@Injectable()
export class UserService {
  constructor(private connection: Connection,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly redisService: RedisService) { }

  // bug?
  @UseInterceptors(ClassSerializerInterceptor)
  async login(dto: LoginUserDto) {
    const user = await this.userRepository.findOneOrFail({ user: dto.user }).catch(e => { throw new Error('user-404') })
    if (cryptoPass(dto.password) !== user.password) {
      throw new Error("user-101");
    }
    const redis = await this.redisService.getClient()
    const uuid = getUuid()
    await redis.setex(uuid, 60 * 60 * 24 * 7, JSON.stringify(user)).catch(e => {
      throw new Error("redis-c");
    })
    return { user, token: uuid }
  }

  async create(dto: CreateUserDto) {
    const user = new User(dto)
    user.password = cryptoPass(user.password)

    await this.isNotExist(user.user)

    return await this.connection.transaction(async manager => {
      await manager.save(user).catch(e => {
        throw new Error('000c')
      })
    })
  }

  async isNotExist(user: string) {
    if (await this.userRepository.findOne({ user })) {
      throw new Error('user-100')
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  async paged(paged: Paged) {
    const qb = this.userRepository.createQueryBuilder('user')
    return await qb.skip(paged.size * (paged.num - 1)).take(paged.size).getMany()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return await this.userRepository.find()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(id: number) {
    return await this.userRepository.findOneOrFail(id)
  }

  async update(id: number, dto: UpdateUserDto, uuid: string) {
    if (!this.userRepository.hasId(new User({ id }))) {
      throw new Error("user-404")
    }

    // return await this.connection.transaction(async manager => {
    //   await manager.update(User, id, dto)
    // })
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const redis = await this.redisService.getClient()
    const expire = await redis.ttl(uuid)
    let ouser
    if (expire != -2) {
      ouser = await redis.get(uuid)
    }
    try {
      await queryRunner.manager.update(User, id, dto);
      await queryRunner.commitTransaction();
      const user = await queryRunner.manager.findOne(User, id)
      if (expire != -2) {
        await redis.setex(uuid, expire, JSON.stringify(user))
      }
    } catch (err) {
      await queryRunner.rollbackTransaction()
      if (expire != -2) {
        await redis.setex(uuid, ouser, expire)
      }
      throw new Error("user-102")
    } finally {
      await queryRunner.release();
    }
  }
}
