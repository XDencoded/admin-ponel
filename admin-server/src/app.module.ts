import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StatisticsModule } from './statistics/statistics.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [UserModule, StatisticsModule, EmailModule],
  
})
export class AppModule {}
