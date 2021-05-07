import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fixture } from 'src/fixture/entities/fixture.entity';
import { Paged } from 'src/utils';
import { User } from 'src/user/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { CreateFixDto, UpdateFixDto } from './entities/fix.dto';
import { Fix } from './entities/fix.entity';

@Injectable()
export class FixService {
  constructor(private connection: Connection,
    @InjectRepository(Fix) private fixRepository: Repository<Fix>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Fixture) private fixtureRepository: Repository<Fixture>) { }

  async create(dto: CreateFixDto) {
    const user = await this.userRepository.findOne(dto.user)
    const fixture = await this.fixtureRepository.findOne({ code: dto.fixture })
    const fix = new Fix()
    fix.born = new Date()
    fix.note = dto.note
    fix.state = dto.state
    fix.user = user
    fixture.state = 'fix'
    fix.fixture_ = fixture
    return await this.connection.transaction(async manager => {
      await manager.save(fix)
    })
  }

  async request(dto: CreateFixDto, user: User) {
    const fixture = await this.fixtureRepository.findOne({ code: dto.fixture })
    if (!fixture) {
      throw new Error("fixture-404");
    }
    const fix = new Fix()
    fix.born = new Date()
    fix.note = dto.note
    fix.state = dto.state
    fix.user = user
    fixture.state = 'fix'
    fix.fixture_ = fixture
    return await this.connection.transaction(async manager => {
      await manager.save(fix)
    })
  }

  async paged(paged: Paged) {
    const qb = this.fixRepository.createQueryBuilder('fix')
    const total = await qb.getCount()
    return {
      list: await qb.skip(paged.size * (paged.num - 1)).take(paged.size).getMany(),
      total
    }
  }

  async update(id: number, dto: UpdateFixDto) {
    return this.connection.transaction(async manager => {
      dto.fixture_.state = dto.state.slice(-1)[0].bool ? 'in' : 'notFix'
      Reflect.deleteProperty(dto, 'user')
      await manager.update(Fix, id, <any>dto)
    })
  }
}
