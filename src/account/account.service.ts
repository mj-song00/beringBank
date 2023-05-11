import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  constructor(private prismaService: PrismaService) {}

  async register() {
    const random = parseInt(process.env.ACCOUNT_RANDOM_NUMBER);
    function randomNumber(n) {
      let str = '';
      for (let i = 1; i < n; i++) {
        str += Math.floor(Math.random() * 10);
      }
      return str;
    }
    const number = randomNumber(random);

    const account = await this.prismaService.account.create({
      data: { accountNumber: number },
      include: { User: true },
    });

    return { result: account, message: 'account created!' };
  }

  async update(id: string) {
    const user = Number(id);
    const account = await this.prismaService.account.update({
      where: {
        id: user,
      },
      data: {
        User: {
          connect: {
            id: user,
          },
        },
      },
      include: {
        User: true,
      },
    });

    delete account.User.password;
    return { result: account, message: '계좌 연결 성공' };
  }
}
