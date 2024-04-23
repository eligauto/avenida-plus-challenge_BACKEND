export interface CardHolderIdentification {
  type: string;
  number: string;
}

interface Cardholder {
  identification: CardHolderIdentification;
  name: string;
  birthday: string;
  nro_puerta: number;
}

export interface TokenRequest {
  card_number: string;
  card_expiration_month: string;
  card_expiration_year: string;
  security_code: string;
  card_holder_name: string;
  card_holder_birthday: string;
  card_holder_door_number: number;
  card_holder_identification: CardHolderIdentification;
}


export interface TokenResponse {
  id: string;
  status: string;
  card_number_length: number;
  date_created: string; 
  bin: string;
  last_four_digits: string;
  security_code_length: number;
  expiration_month: number;
  expiration_year: number;
  date_due: string;
  cardholder: Cardholder;
}