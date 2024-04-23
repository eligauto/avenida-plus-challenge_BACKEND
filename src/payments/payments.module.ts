import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PayWayApiModule } from 'src/pay-way-api/pay-way-api.module';

@Module({
  imports: [PayWayApiModule],
  providers: [PaymentsService],
  controllers: [PaymentsController]
})
export class PaymentsModule {}
