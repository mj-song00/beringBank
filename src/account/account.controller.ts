import {
  CreateAccountDto,
  DepositOrWithdrawDto,
} from './dto/create-account.dto';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // 계좌생성
  @Post('/register')
  @UseGuards(AuthGuard('jwt'))
  createAcoount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.register(createAccountDto);
  }

  //현금 입금
  @Post('/deposit')
  @UseGuards(AuthGuard('jwt'))
  depositCash(@Body() depositOrWithdrawDto: DepositOrWithdrawDto) {
    return this.accountService.depositCash(depositOrWithdrawDto);
  }

  //현금출금
  @Post('/withdraw')
  @UseGuards(AuthGuard('jwt'))
  withdrawCash(@Body() depositOrWithdrawDto: DepositOrWithdrawDto) {
    return this.accountService.withdrawCash(depositOrWithdrawDto);
  }
}
