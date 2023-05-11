import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { userInfo } from 'os';

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

  async update(accountId: string, userId: string) {
    const user = Number(userId);
    const accountNumber = Number(accountId);
    const account = await this.prismaService.account.update({
      where: {
        id: accountNumber,
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

  async depositCash(userId: string, accountId: string, deposit: string) {
    const user = Number(userId);
    const account = Number(accountId);
    const cash = Number(deposit);

    const balance = await this.prismaService.account.update({
      where: {
        id: account,
      },
      data: {
        depositCash: {
          increment: cash,
        },
        accountBalance: { increment: cash },
      },
    });
    const userCash = await this.prismaService.user.update({
      where: {
        id: user,
      },
      data: {
        cashWithdraw: {
          increment: cash,
        },
        cashBalance: {
          decrement: cash,
        },
      },
    });

    console.log(balance, userCash);
    //return;
  }

  async withdrawCash(withdrawCash: string) {
    return;
  }
}
