import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fixture } from 'src/fixture/entities/fixture.entity';
import { Paged } from 'src/utils';
import { User } from 'src/user/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { CreateUselessDto, UpdateUselessDto } from './entities/useless.dto'
import { Useless } from './entities/useless.entity';

@Injectable()
export class UselessService {
  constructor(private connection: Connection,
    @InjectRepository(Useless) private uselessRepository: Repository<Useless>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Fixture) private fixtureRepository: Repository<Fixture>) { }

  async create(dto: CreateUselessDto) {
    const useless = new Useless()
    useless.note = dto.note
    useless.state = dto.state
    const user = await this.userRepository.findOne(dto.user)
    const fixture = await this.fixtureRepository.findOne({ code: dto.fixture })
    useless.user = user
    useless.fixture = fixture
    return this.connection.transaction(async manager => {
      await manager.save(useless)
      await manager.update(Fixture, fixture, { state: 'checking' })
    })
  }

  async request(dto: CreateUselessDto, token: User) {
    const useless = new Useless()
    useless.note = dto.note
    useless.state = dto.state
    useless.user = token
    const fixture = await this.fixtureRepository.findOne({ code: dto.fixture })
    useless.fixture = fixture
    return await this.connection.transaction(async manager => {
      await manager.save(useless)
      await manager.update(Fixture, fixture, { state: 'checking' })
    })
  }

  async paged(paged: Paged) {
    const qb = this.uselessRepository.createQueryBuilder('useless')
    const total = await qb.getCount()
    return {
      list: await qb.leftJoinAndSelect('useless.fixture', 'fixture')
        .leftJoinAndSelect('useless.user', 'user')
        .skip(paged.size * (paged.num - 1)).take(paged.size).getMany(),
      total
    }
  }

  async update(id: number, dto: UpdateUselessDto) {
    const fixture = await this.fixtureRepository.findOne({ id: <any>dto.fixture })
    fixture.state = dto.state.slice(-1)[0].bool ? 'useless' : 'in'
    return await this.connection.transaction(async manager => {
      await manager.update(Useless, id, { state: dto.state })
      await manager.save(fixture)
    })
  }
}
