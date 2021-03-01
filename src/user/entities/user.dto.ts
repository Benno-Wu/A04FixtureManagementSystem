import { PartialType } from '@nestjs/mapped-types';
import { Auth } from 'src/utils';

export class LoginUserDto {
    user: string
    password: string
}

export class CreateUserDto {
    user: string
    password: string
    name: string
    authority: Auth
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
    id: number
}
