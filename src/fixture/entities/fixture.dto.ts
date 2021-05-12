import { PartialType } from '@nestjs/mapped-types';
import { Paged } from 'src/utils';

export class CreateFixtureDto {
    code: string
    name: string
    usedFor: string
    PMPeriod: number
    location: string
    pic: string
}

// 更改主要是swagger上好看些， 实际还是单id吧
export class UpdateFixtureDto extends PartialType(CreateFixtureDto) {
    // export class UpdateFixtureDto extends CreateFixtureDto) {
    id: number
}

export class SearchFixtureDto extends Paged {
    code: string
}
