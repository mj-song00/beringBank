import { CreateAccountDto } from './dto/create-account.dto';
import { Controller, Get, Patch, Param, Post, Body } from '@nestjs/common';

import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // 계좌생성
  @Post('/register')
  createAcoount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.register(createAccountDto);
  }

  //현금 입금
  @Post('/deposit/:userId/:accountId/:deposit')
  depositCash(
    @Param('userId') userId: string,
    @Param('accountId') accountId: string,
    @Param('deposit') deposit: string,
  ) {
    return this.accountService.depositCash(userId, accountId, deposit);
  }

  //현금출금
  @Post('/withdraw/:userId/:accountId/:withdraw')
  withdrawCash(
    @Param('userId') userId: string,
    @Param('accountId') accountId: string,
    @Param('withdraw') withdraw: string,
  ) {
    return this.accountService.withdrawCash(userId, accountId, withdraw);
  }
}
