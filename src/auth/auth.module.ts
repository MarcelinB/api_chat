import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([
    User,
  ]), PassportModule, UserModule, JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {  },
    }),],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

