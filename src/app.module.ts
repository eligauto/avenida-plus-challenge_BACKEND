import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PayWayApiModule } from './pay-way-api/pay-way-api.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    PayWayApiModule,
    PaymentsModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
