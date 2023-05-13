import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import { JwtPayload, sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService, //private accountService: AccountService,
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
    const token = this.createToken(user);

    return { result: token, message: '로그인 완료' };
  }

  createToken(user: User) {
    const payload: JwtPayload = {
      sub: user.userId,
    };

    const secret = process.env.JWT_SECRET;
    const expiresIn = '3h';
    const token = sign(payload, secret, { expiresIn });

    return token;
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { card: true, account: true },
    });
    delete user.password;

    return { result: user, message: `${id}번 유저조회 완료` };
  }
}
