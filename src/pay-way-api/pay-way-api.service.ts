import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TokenRequest, TokenResponse } from './types/token-request.interface';
import {
  PaymentRequest,
  PaymentResponse,
} from './types/payment-request.interface';

@Injectable()
export class PayWayApiService {
  constructor(private httpService: HttpService) {}
  // Use the PayWay API to process a payment.

  // This method should return the token
  async createToken(requestData: TokenRequest): Promise<TokenResponse> {
    const apikey = process.env.PAYWAY_API_KEY;
    const url = process.env.PAYWAY_API_URL + '/tokens';
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apikey: apikey,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, requestData, {
          headers,
        }),
      );

      return response.data;
    } catch (error) {
      throw this.errorHandling(error.response);
    }
  }

  // 2nd Step: Payment Execution
  async executePayment(
    paymentRequest: PaymentRequest,
  ): Promise<PaymentResponse> {
    const apikey = process.env.PAYWAY_API_SECRET;
    const url = process.env.PAYWAY_API_URL + '/payments';

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, paymentRequest, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            apikey: apikey,
          },
        }),
      );

      return response.data;
    } catch (error) {
      throw this.errorHandling(error.response);
    }
  }

  private async errorHandling(error: any) {
    if (error.status === 400) {
      let errorMessage = 'Bad request';

      if (error.data && error.data.error_type) {
        errorMessage = `Error: ${error.data.error_type}`;
      }

      if (error.data && Array.isArray(error.data.validation_errors)) {
        const validationMessages = error.data.validation_errors.map((err) => {
          return `Code: ${err.code}, Param: ${err.param}`;
        });
        errorMessage += `; Validation Errors: ${validationMessages.join('; ')}`;
      }

      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    throw new HttpException(
      'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
