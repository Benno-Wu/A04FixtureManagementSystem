import { PartialType } from '@nestjs/mapped-types';
import { State } from 'src/utils';

export class CreateUselessDto {
    note: string
    state: Array<State>
    user: string
    fixture: string
}

export class UpdateUselessDto extends PartialType(CreateUselessDto) {
    id: number
}
