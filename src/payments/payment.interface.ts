// This is a simple interface that represents a payment.
export interface Payment {
  id: number;
  amount: number;
  status: string; // 'approved' or 'rejected'
}
