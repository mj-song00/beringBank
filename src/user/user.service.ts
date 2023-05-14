import { Payload } from './../security/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable, Next } from '@nestjs/common';
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
    const { userId, password, nickname, confirmPassword } = createUserDto;
    const isExist = await this.prismaService.user.findUnique({
      where: { userId },
    });
    if (isExist) throw new BadRequestException(`Existing user`);
    if (password !== confirmPassword)
      throw new BadRequestException(`비밀번호를 확인해주세요`);

    function checkPassword(password) {
      const regExp =
        /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

      if (!regExp.test(password)) {
        return false;
      }
      return true;
    }

    const check = checkPassword(password);
    if (check == false) {
      return `숫자, 영문, 특수문자를 포함한 8-15자리 문자열을 입력해주세요`;
    }

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
    console.log(payload);
    const user = await this.prismaService.user.findFirst({
      where: { nickname: payload.username },
    });
    console.log(user);
    return user;
  }

  async find(user: User) {
    const infomation = await this.prismaService.user.findUnique({
      where: { id: user.id },
      include: { card: true, account: true },
    });

    delete infomation.password;
    return infomation;
  }
}
