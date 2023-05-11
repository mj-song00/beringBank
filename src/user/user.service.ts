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
      include: {
        card: true,
        account: true,
      },
    });
    delete user.password;
    console.log(user);
    return { result: user, message: '유저생성 완료' };
  }

  // async findAll() {
  //   const users = await this.prismaService.user.findMany({
  //     include: {
  //       card: true,
  //       account: true,
  //     },
  //   });
  // }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { card: true, account: true },
    });
    delete user.password;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
