import { Controller, Get, Patch, Param } from '@nestjs/common';
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
  @Patch('/:userId')
  update(@Param('userId') id: string) {
    return this.accountService.update(id);
  }
}
