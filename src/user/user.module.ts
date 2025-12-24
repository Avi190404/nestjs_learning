import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '12h' },
    })
  ],
  providers: [UserService, PrismaService],
  controllers: [UserController]
})
export class UserModule {}
