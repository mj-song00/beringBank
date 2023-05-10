import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { userId, password, nickname } = createUserDto;
    const isExist = await this.prismaService.user.findUnique({
      where: { userId },
    });

    if (isExist) throw new BadRequestException(`Existing user`);
    const USER_SALT = parseInt(process.env.USER_SALT);

    const hashedPassword = await bcrypt.hash(password, USER_SALT);

    const user = await this.prismaService.user.create({
      data: {
        userId,
        password: hashedPassword,
        nickname,
      },
    });

    return { result: user, message: '유저생성 완료' };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
