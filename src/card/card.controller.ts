import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  //카드 발급
  @Get('/register')
  create() {
    return this.cardService.register();
  }

  //card use or not to use
  @Patch('convert/:id')
  update(@Param('id') id: string) {
    return this.cardService.update(+id);
  }

  //user와 card 연결
  // @Patch('/connect/:cardId/:userId')
  // connetUser(@Param('cardId') cardId: string, @Param('userId') userId: string) {
  //   return this.cardService.connetUser(cardId, userId);

  //card와 account 연결
  // @Patch('/connect/:cardId/:accountId')
  // connetAccount(
  //   @Param('cardId') cardId: string,
  //   @Param('accountId') accountId: string,
  // ) {
  //   return this.cardService.connetAccount(cardId, accountId);
  //}
}
