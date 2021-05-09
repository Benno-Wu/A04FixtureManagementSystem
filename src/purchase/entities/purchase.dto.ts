import { PartialType } from '@nestjs/mapped-types';
import { Fixture } from 'src/fixture/entities/fixture.entity';
import { State } from 'src/utils';

export class CreatePurchaseDto {
    state: Array<State>
    price: number
    billNo: string
    user: number
    fixture: Array<Fixture>
}

// todo bug
export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {
    id: number
    purchaseId: number
}
