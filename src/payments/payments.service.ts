import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PayWayApiService } from 'src/pay-way-api/pay-way-api.service';
import { Payment } from './payment.interface';

@Injectable()
export class PaymentsService {
  constructor(private payWayApiService: PayWayApiService) {}
  // This is a simple in-memory database of payments.
  private readonly payments: Payment[] = [];

  async createPayment(paymentData: Payment) {
    try {
      // 1st Step: Token Creation
      const tokenResponse = await this.payWayApiService.createToken(
        paymentData,
      ); //
      if (tokenResponse.status === 'active') {
        let payment = {
          ...paymentData,
          id: this.generateId(),
        };

        //Payment execution
        const paymentResponse = await this.payWayApiService.executePayment({
          site_transaction_id: 'Bolishopping' + payment.id,
          token: tokenResponse.id,
          payment_method_id: 1,
          bin: paymentData.card_number.substring(0, 6),
          amount: paymentData.amount,
          currency: 'BRL',
          installments: 1,
          payment_type: 'credit',
          sub_payments: [],
        });

        if (paymentResponse.status === 'approved') {
          payment = {
            ...payment,
            status: paymentResponse.status,
            date: paymentResponse.date,
          };
        } else {
          throw new HttpException(
            'Payment not approved',
            HttpStatus.BAD_REQUEST,
          );
        }
        this.payments.push(payment);
        return payment;
      } else {
        throw new HttpException('Payment not approved', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(
        'Error with payment processing',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // This method creates a new payment and adds it to the database.
  getPaymentById(id: string): Payment | undefined {
    return this.payments.find((payment) => payment.id === Number(id));
  }

  // This method returns all payments in the database.
  getAllPayments(): Payment[] {
    return this.payments;
  }

  // This method generates a unique ID for a new payment.
  private generateId(): number {
    return this.payments.length + 1;
  }
}
