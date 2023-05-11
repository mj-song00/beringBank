import { Controller, Get, Patch, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // 계좌생성
  @Get('/register')
  createAcoount() {
    return this.accountService.register();
  }

  //user와 account 연결
  @Patch('/connect/:accountId/:userId')
  update(
    @Param('accountId') accountId: string,
    @Param('userId') userId: string,
  ) {
    return this.accountService.update(accountId, userId);
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
  @Post('/:withdraw')
  withdrawCash(@Param() withdrawCash: string) {
    return this.accountService.withdrawCash(withdrawCash);
  }
}
