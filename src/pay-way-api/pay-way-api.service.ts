import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenRequest, TokenResponse } from './types/token-request.interface';
import { PaymentRequest, PaymentResponse } from './types/payment-request.interface';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PayWayApiService {
  constructor(private httpService: HttpService) {}
  // Use the PayWay API to process a payment.

  // This method should return the token
  async createToken(requestData: TokenRequest): Promise<TokenResponse> {
    const apikey = process.env.PAYWAY_API_KEY;
    const url = process.env.PAYWAY_API_URL + '/tokens';

    try {
      const response = await this.httpService
        .post(url, requestData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            apikey: apikey,
          },
        })
        .toPromise(); 

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error creating token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 2nd Step: Payment Execution
  async executePayment(paymentRequest: PaymentRequest): Promise<PaymentResponse>{
    const apikey = process.env.PAYWAY_API_SECRET;
    const url = process.env.PAYWAY_API_URL + '/payments';

    try {
      const response = await this.httpService
        .post(url, paymentRequest, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            apikey: apikey,
          },
        }).toPromise();

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error processing payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
