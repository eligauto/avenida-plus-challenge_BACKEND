import { Module } from '@nestjs/common';
import { PayWayApiService } from './pay-way-api.service';

@Module({
  providers: [PayWayApiService],
  exports: [PayWayApiService],
})
export class PayWayApiModule {}
