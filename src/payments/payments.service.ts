import { Injectable } from '@nestjs/common';
import { PayWayApiService } from '../pay-way-api/pay-way-api.service';
import { Payment } from './payment.interface';

@Injectable()
export class PaymentsService {
  constructor(private payWayApiService: PayWayApiService) {}
  // This is a simple in-memory database of payments.
  private readonly payments: Payment[] = [];
  
  // This method creates a new payment and adds it to the database.
  async createPayment(paymentData: Payment) {
    try {
      // 1st Step: Token Creation
      const tokenResponse = await this.payWayApiService.createToken(
        paymentData,
      );

      let payment = {
        ...paymentData,
        id: this.generateId(),
      };

      //Payment execution
      const paymentResponse = await this.payWayApiService.executePayment({
        site_transaction_id: this.uuidGenerator(),
        token: tokenResponse.id,
        payment_method_id: 1,
        bin: paymentData.card_number.substring(0, 6),
        amount: paymentData.amount,
        currency: 'ARS',
        installments: 1,
        payment_type: 'single',
        sub_payments: [],
      });

      payment = {
        ...payment,
        status: paymentResponse.status,
        date: paymentResponse.date,
        transaction_id: paymentResponse.site_transaction_id,
      };

      this.payments.push(payment);
      return payment;
    } catch (error) {
      return error;
    }
  }

  // In the Challenge says that this method should return a payment by its ID, but if the ID is not provided, it should return all payments.
  async getPaymentById(id?: string): Promise<Payment | Payment[] | undefined> {
    if (!id) {
      return await this.getAllPayments();
    }
    return await this.payments.find((payment) => payment.id === Number(id));
  }

  // This method returns all payments in the database.
  async getAllPayments(): Promise<Payment[]> {
    return await this.payments;
  }

  // This method generates a unique ID for a new payment.
  private generateId(): number {
    return this.payments.length + 1;
  }

  private uuidGenerator(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
