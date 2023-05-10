import { IsNotEmpty } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  cardNumber: string;

  isAble: boolean;
}
