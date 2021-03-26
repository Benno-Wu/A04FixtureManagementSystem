import { PartialType } from '@nestjs/mapped-types';
import { State } from 'src/utils';

export class CreateUselessDto {
    note: string
    state: Array<State>
    user: string
    fixture: string
}

// export class UpdateUselessDto extends PartialType(CreateUselessDto) {
export class UpdateUselessDto {
    id: number
    state: Array<State>
    fixture: string
}
