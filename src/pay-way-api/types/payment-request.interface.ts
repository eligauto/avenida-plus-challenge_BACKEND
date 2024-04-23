interface PaymentStatusDetails {
  ticket: string;
  card_authorization_code: string;
  address_validation_code: string;
  error: null | string;
}

export interface PaymentRequest {
  site_transaction_id: string;
  token: string;
  payment_method_id: number;
  bin: string;
  amount: number;
  currency: string;
  installments: number;
  payment_type: string;
  sub_payments: any[];
}

export interface PaymentResponse {
  id: number;
  site_transaction_id: string;
  payment_method_id: number;
  card_brand: string;
  amount: number;
  currency: string;
  status: string; 
  status_details: PaymentStatusDetails;
  date: string;
  payment_mode: null | string; 
  customer: null | string; 
  bin: string;
  installments: number;
  first_installment_expiration_date: null | string; 
  payment_type: string;
  sub_payments: any[]; 
  site_id: string;
  fraud_detection: null | any; 
  aggregate_data: null | any; 
  establishment_name: null | string;
  spv: null | any; 
  confirmed: null | boolean;
  pan: null | string;
  customer_token: null | string;
  card_data: string;
  token: string;
}
