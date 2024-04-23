import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './payment.interface';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  createPayment(@Body() payment: Payment) {
    return this.paymentsService.createPayment(payment);
  }

  @Get(':id')
  getPaymentById(@Param('id') id: string) {
    return this.paymentsService.getPaymentById(id);
  }

  @Get()
  getAllPayments() {
    return this.paymentsService.getAllPayments();
  }
}

