import { User } from '@prisma/client';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorator/get-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  async login(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  find(@GetUser() user: User) {
    return this.userService.find(user);
  }
}
