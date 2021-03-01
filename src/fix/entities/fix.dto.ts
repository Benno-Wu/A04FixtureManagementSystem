import { PartialType } from '@nestjs/mapped-types';
import { Fixture } from 'src/fixture/entities/fixture.entity';
import { State } from 'src/utils';

export class CreateFixDto {
    note: string
    state: Array<State>
    user: number
    fixture: string
}

export class UpdateFixDto extends PartialType(CreateFixDto) {
    id: number
    fixture_: Fixture
}

// export class UpdateFixDto {
//     id: number
//     state: Array<State>
//     fixture: Partial<Fixture>
// }
