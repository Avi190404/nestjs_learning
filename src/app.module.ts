import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [RolesModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
