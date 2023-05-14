import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  confirmPassword: string;
  @IsNotEmpty()
  nickname: string;
  cashWithdraw: number;
  cashDeposit: number;
  cashBalance: number;
}

export class SignInDto {
  userId: string;
  password: string;
}
