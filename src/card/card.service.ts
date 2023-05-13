import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { find } from 'rxjs';

@Injectable()
export class CardService {
  constructor(private prismaService: PrismaService) {}

  async register(createCardDto: CreateCardDto) {
    const { cardNumber, isAble, userId, accountId } = createCardDto;
    const random = parseInt(process.env.CARD_RANDOM_NUMBER);
    function randomNumber(n) {
      let str = '';
      for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10);
      }
      return str;
    }

    const number = randomNumber(random);

    const card = await this.prismaService.card.create({
      data: {
        cardNumber: number,
        isAble,
        User: {
          connect: {
            id: userId,
          },
        },
        Account: {
          connect: {
            id: accountId,
          },
        },
      },
      include: {
        User: true,
        Account: true,
      },
    });
    delete card.User.password;

    return card;
  }

  async update(id: number) {
    const number = Number(id);
    const card = await this.prismaService.card.findUnique({
      where: { id: number },
    });

    const convert = await this.prismaService.card.update({
      where: { id: number },
      data: {
        isAble: card.isAble ? false : true,
      },
    });

    return { message: 'card convert success' };
  }
}
