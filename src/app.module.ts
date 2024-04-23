import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PayWayApiModule } from './pay-way-api/pay-way-api.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PayWayApiModule,
    HttpModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
