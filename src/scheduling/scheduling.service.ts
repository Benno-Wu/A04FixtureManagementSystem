import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fixture } from 'src/fixture/entities/fixture.entity';
import { Paged } from 'src/utils';
import { User } from 'src/user/entities/user.entity';
import { schedulingMap } from 'src/utils/text';
import { Connection, Repository } from 'typeorm';
import { CreateSchedulingDto, UpdateSchedulingDto } from './entities/scheduling.dto';
import { Scheduling } from './entities/scheduling.entity';

@Injectable()
export class SchedulingService {
  constructor(private connection: Connection,
    @InjectRepository(Scheduling) private schedulingRepository: Repository<Scheduling>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Fixture) private fixtureRepository: Repository<Fixture>) { }

  async create(dto: CreateSchedulingDto) {
    const user = await this.userRepository.findOne(dto.user)
    const fixture = await this.fixtureRepository.findOne({ code: dto.fixture })
    // 离谱,缘由是为了从dto直接new出entity
    if (fixture.state === schedulingMap(dto.state.slice(-1)[0].bool)) {
      throw new Error('scheduling-100')
    }
    fixture.state = schedulingMap(dto.state.slice(-1)[0].bool)
    if (fixture.state === 'out') {
      fixture.useCount++
    }
    const scheduling = new Scheduling(dto)
    scheduling.fixture = fixture.id
    scheduling.user_ = user
    scheduling.fixture_ = fixture
    return await this.connection.transaction(async manager => {
      await manager.save(scheduling)
    })
  }

  async add(dto: CreateSchedulingDto, user: User) {
    const fixture = await this.fixtureRepository.findOne({ code: dto.fixture })
    const state = schedulingMap(dto.state.slice(-1)[0].bool)
    if (fixture.state === state) {
      throw new Error('scheduling-100')
    }
    fixture.state = state
    if (fixture.state === 'out') {
      fixture.useCount++
    }
    const scheduling = new Scheduling(dto)
    scheduling.fixture = fixture.id
    scheduling.user_ = user
    scheduling.fixture_ = fixture
    return await this.connection.transaction(async manager => {
      await manager.save(scheduling)
      await manager.save(fixture)
    })
  }

  async paged(paged: Paged) {
    const qb = this.schedulingRepository.createQueryBuilder('scheduling')
    const total = await qb.getCount()
    return {
      total, list: await qb.leftJoinAndSelect("scheduling.user_", "user")
        .leftJoinAndSelect("scheduling.fixture_", "fixture")
        .skip(paged.size * (paged.num - 1)).take(paged.size).getMany()
    }
  }
}
