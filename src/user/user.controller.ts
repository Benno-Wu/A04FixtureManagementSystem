import { Controller, Get, Post, Body, Put, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './entities/user.dto';
import { Request } from 'express';
import { Paged } from 'src/utils';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('exist/:user')
  async exist(@Param('user') user: string) {
    return await this.userService.isNotExist(user)
  }

  @Post('register')
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Post('login')
  async findOne(@Body() dto: LoginUserDto) {
    return await this.userService.login(dto)
  }

  @ApiBearerAuth()
  @Get('self')
  self(@Body() dto) {
    return { ...dto.token, password: undefined }
  }

  @ApiBearerAuth()
  @Post('all')
  async paged(@Body() paged: Paged) {
    return await this.userService.paged(paged)
  }

  @ApiBearerAuth()
  @Put('all')
  async update(@Body() dto: UpdateUserDto, @Req() req: Request) {
    // bug, request's token is operator, just expire that user!
    return await this.userService.update(dto.id, dto, req.headers.authorization);
  }
}
