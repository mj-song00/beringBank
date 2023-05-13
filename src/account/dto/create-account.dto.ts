import { IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  accountNumber: string;
  withdrawCash: number;
  depositCash: number;
  accountBalance: number;
  userId: number;
}

export class DepositOrWithdrawDto {
  userId: number;
  accountId: number;
  cash: number;
}
