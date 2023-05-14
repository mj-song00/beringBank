import { Payload } from './../security/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import { JwtPayload, sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

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
    return { result: user, message: '유저생성 완료' };
  }

  async signIn(signInDto: SignInDto) {
    const { userId, password } = signInDto;

    const user = await this.prismaService.user.findUnique({
      where: { userId },
    });

    if (!user) throw new BadRequestException();

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!userId || !validatePassword) {
      throw new BadRequestException();
    }
    const payload = { username: user.nickname, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async tokenValidateUser(payload: Payload) {
    const user = await this.prismaService.user.findFirst({
      where: { id: payload.id },
    });

    return user;
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
      include: { card: true, account: true },
    });
    delete user.password;

    return { result: user, message: `${id}번 유저조회 완료` };
  }
}
