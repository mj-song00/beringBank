import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  //카드 발급
  @Post('/register')
  @UseGuards(AuthGuard('jwt'))
  createCard(@Body() createCardDto: CreateCardDto) {
    return this.cardService.register(createCardDto);
  }

  //card use or not to use
  @Patch('convert/:id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string) {
    return this.cardService.update(+id);
  }
}
