import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/security/passport.jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/constants/constants';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),
  ],
})
export class UserModule {}
