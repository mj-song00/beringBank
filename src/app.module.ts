import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [PrismaModule, CardModule, UserModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
