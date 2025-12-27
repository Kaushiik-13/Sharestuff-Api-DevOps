import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../entities/users.entity';
import { Login } from '../entities/logins.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Login])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
