import { Injectable } from '@nestjs/common';
import { Payment } from './payment.interface';

@Injectable()
export class PaymentsService {
  // This is a simple in-memory database of payments.
  private readonly payments: Payment[] = [];

  createPayment(payment: Payment) {
    // Generate a unique ID for the new payment.
    payment.id = this.generateId();

    // Add the new payment to the database.
    this.payments.push(payment);

    return payment;
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
