import { PartialType } from '@nestjs/mapped-types';
import { State } from 'src/utils';

export class CreateSchedulingDto {
    state: Array<State>
    user: number
    fixture: string
}

export class UpdateSchedulingDto extends PartialType(CreateSchedulingDto) {
    id: number
}
