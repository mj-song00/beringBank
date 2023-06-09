import {
  CreateAccountDto,
  DepositOrWithdrawDto,
} from './dto/create-account.dto';

import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  constructor(private prismaService: PrismaService) {}

  async register(createAccountDto: CreateAccountDto) {
    const { accountBalance, accountNumber, withdrawCash, depositCash, userId } =
      createAccountDto;

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
      data: {
        accountNumber: number,
        accountBalance,
        withdrawCash,
        depositCash,
        User: {
          connect: {
            id: userId,
          },
        },
      },
      include: { User: true },
    });
    delete account.User.password;

    return { result: account, message: 'account created!' };
  }

  async depositCash(depositOrWithdrawDto: DepositOrWithdrawDto) {
    const { userId, accountId, cash } = depositOrWithdrawDto;

    const balance = await this.prismaService.account.update({
      where: {
        id: accountId,
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
        id: userId,
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
    return { result: balance.accountBalance };
  }

  async withdrawCash(depositOrWithdrawDto: DepositOrWithdrawDto) {
    const { userId, accountId, cash } = depositOrWithdrawDto;
    const balance = await this.prismaService.account.update({
      where: {
        id: accountId,
      },
      data: {
        withdrawCash: {
          increment: cash,
        },
        accountBalance: { decrement: cash },
      },
    });
    const userCash = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        cashDeposit: {
          decrement: cash,
        },
        cashBalance: {
          increment: cash,
        },
      },
    });
    return { result: balance.accountBalance };
  }
}
