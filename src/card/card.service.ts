import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(private prismaService: PrismaService) {}
  async register() {
    function randomNumber(n) {
      let str = '';
      for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10);
      }
      return str;
    }
    const number = randomNumber(9);

    const card = await this.prismaService.card.create({
      data: {
        cardNumber: number,
      },
      include: {
        User: true,
      },
    });
    return card;
  }

  async findAll() {
    // const users = await this.prismaService.user.findMany({ where });
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
