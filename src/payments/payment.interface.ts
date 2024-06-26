import { TokenRequest } from "../pay-way-api/types/token-request.interface";

// This is a simple interface that represents a payment.
export interface Payment extends TokenRequest{
  id?: number;
  amount?: number;
  status?: string;
  date?: string;
  transaction_id?: string;
}
