import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserService } from 'src/user/user.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, JwtStrategy],
})
export class AuthModule {}
