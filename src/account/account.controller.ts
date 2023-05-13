import {
  CreateAccountDto,
  DepositOrWithdrawDto,
} from './dto/create-account.dto';
import { Controller, Post, Body } from '@nestjs/common';
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
  @Post('/deposit')
  depositCash(@Body() depositOrWithdrawDto: DepositOrWithdrawDto) {
    return this.accountService.depositCash(depositOrWithdrawDto);
  }

  //현금출금
  @Post('/withdraw')
  withdrawCash(@Body() depositOrWithdrawDto: DepositOrWithdrawDto) {
    return this.accountService.withdrawCash(depositOrWithdrawDto);
  }
}
