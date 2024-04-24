import { Module } from '@nestjs/common';
import { PayWayApiService } from './pay-way-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PayWayApiService],
  exports: [PayWayApiService],
})
export class PayWayApiModule {}
