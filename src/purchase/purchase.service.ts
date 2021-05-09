import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paged } from 'src/utils';
import { User } from 'src/user/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { CreatePurchaseDto, UpdatePurchaseDto } from './entities/purchase.dto';
import { Purchase } from './entities/purchase.entity';

@Injectable()
export class PurchaseService {
  constructor(private connection: Connection,
    @InjectRepository(Purchase) private purchaseRepository: Repository<Purchase>,
    @InjectRepository(User) private userRepository: Repository<User>,) { }

  async create(dto: CreatePurchaseDto) {
    const user = await this.userRepository.findOne(dto.user)
    const purchase = new Purchase()
    purchase.user = user
    purchase.born = new Date()
    purchase.billNo = dto.billNo
    purchase.price = dto.price
    purchase.state = dto.state
    dto.fixture.forEach(f => {
      f.born = new Date()
      f.state = 'purchase'
      f.useCount = 0
    })
    purchase.fixture = dto.fixture
    return await this.connection.transaction(async manager => {
      await manager.save(purchase)
    })
  }

  async request(dto: CreatePurchaseDto, user: User) {
    const purchase = new Purchase()
    purchase.user = user
    purchase.born = new Date()
    purchase.billNo = dto.billNo
    purchase.price = dto.price
    purchase.state = dto.state
    dto.fixture.forEach(f => {
      f.born = new Date()
      f.state = 'purchase'
      f.useCount = 0
    })
    purchase.fixture = dto.fixture
    return await this.connection.transaction(async manager => {
      await manager.save(purchase)
    })
  }

  async paged(paged: Paged) {
    const qb = this.purchaseRepository.createQueryBuilder('purchase')
    const total = await qb.getCount()
    // return { total, list: await qb.skip(paged.size * (paged.num - 1)).take(paged.size) }
    return {
      total,
      list: await qb.leftJoinAndSelect("purchase.fixture", "fixture")
        .skip(paged.size * (paged.num - 1))
        .take(paged.size)
        .getMany()
    }
  }

  async update(id: number, dto: UpdatePurchaseDto) {
    // 根据id查，再改fixture对象&state... update
    return await this.connection.transaction(async manager => {
      dto.fixture.forEach(f => {
        f.state = dto.state.slice(-1)[0].bool ?
          (dto.state.length === 3 ? 'in' : 'purchase') : 'notPurchase'
      })
      const _ = await manager.findOne(Purchase, dto.id)
      _.fixture = dto.fixture
      _.state = dto.state
      await manager.save(_)
      // await manager.update(Purchase, id, { state: dto.state, fixture: dto.fixture })
    })
  }
}
