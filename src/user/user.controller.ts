import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Account } from 'src/decorator/account.decorator';
import { Account as Taccount } from '@prisma/client';
import { UpdateAccountDto } from 'src/account/dto/update-account.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Patch('/account')
  // updateAccount(
  //   @Body() updateUserDto: UpdateUserDto,
  //   @Account() account: Taccount,
  // ) {
  //   return this.userService.update(updateUserDto, account);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
