import { PartialType } from '@nestjs/mapped-types';

export class CreateFixtureDto {
    code: string
    name: string
    usedFor: string
    PMPeriod: number
    location: string
    pic: string
}

export class UpdateFixtureDto extends PartialType(CreateFixtureDto) {
    id: number
}
