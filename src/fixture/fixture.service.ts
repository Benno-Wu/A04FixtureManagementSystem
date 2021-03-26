import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paged } from 'src/utils';
import { Connection, Repository } from 'typeorm';
import { CreateFixtureDto, UpdateFixtureDto } from './entities/fixture.dto';
import { Fixture } from './entities/fixture.entity';

@Injectable()
export class FixtureService {
  constructor(private connection: Connection,
    @InjectRepository(Fixture) private fixtureRepository: Repository<Fixture>) { }

  async isExist(code: string) {
    try {
      await this.fixtureRepository.findOneOrFail({ code })
    } catch (error) {
      throw new Error('fixture-404')
    }
  }

  async paged(paged: Paged) {
    const qb = this.fixtureRepository.createQueryBuilder('fixture')
    return await qb.skip(paged.size * (paged.num - 1)).take(paged.size).getMany()
  }

  async update(id: number, dto: UpdateFixtureDto) {
    return await this.connection.transaction(async manager => {
      await manager.update(Fixture, id, dto)
    })
  }
}
