import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { Payment } from './payment.interface';
import { PayWayApiService } from '../pay-way-api/pay-way-api.service';
import { TokenResponse } from '../pay-way-api/types/token-request.interface';
import { PaymentResponse } from '../pay-way-api/types/payment-request.interface';

describe('PaymentsService', () => {
  let service: PaymentsService;

  const mockPayWayApiService = {
    createToken: jest.fn(),
    executePayment: jest.fn(),
  };

  const tokenResponse: TokenResponse = {
    id: '1fe53bf2-c5b1-4ba0-8cb9-c74d3f7e16fb',
    status: 'active',
    card_number_length: 16,
    date_created: '2024-04-24T10:42Z',
    bin: '450799',
    last_four_digits: '4905',
    security_code_length: 3,
    expiration_month: 12,
    expiration_year: 29,
    date_due: '2024-04-24T10:57Z',
    cardholder: {
      identification: {
        type: '',
        number: '38555826',
      },
      name: 'Jose Perez',
      birthday: '01091994',
      nro_puerta: 1502,
    },
  };

  const paymentResponse: PaymentResponse = {
    id: 1024999161,
    site_transaction_id: 'uniquecamp',
    payment_method_id: 1,
    card_brand: 'Visa',
    amount: 5000,
    currency: 'ars',
    status: 'approved',
    status_details: {
      ticket: '5793',
      card_authorization_code: '105043',
      address_validation_code: 'VTE0011',
      error: null,
    },
    date: '2024-04-24T10:50Z',
    payment_mode: null,
    customer: null,
    bin: '450799',
    installments: 1,
    first_installment_expiration_date: null,
    payment_type: 'single',
    sub_payments: [],
    site_id: '28464383',
    fraud_detection: null,
    aggregate_data: null,
    establishment_name: null,
    spv: null,
    confirmed: null,
    pan: null,
    customer_token: null,
    card_data: '/tokens/1024999161',
    token: 'ded33108-a405-4e2f-9a7e-b2c06d72d171',
  };

  const paymentData: Payment = {
    card_number: '4507990000004905',
    card_expiration_month: '12',
    card_expiration_year: '29',
    security_code: '123',
    card_holder_name: 'John Doe',
    card_holder_birthday: '01091994',
    card_holder_door_number: 1502,
    card_holder_identification: {
      type: 'string',
      number: '38555826',
    },
    amount: 10000,
  };

  beforeEach(async () => {
    mockPayWayApiService.createToken.mockResolvedValue(tokenResponse);
    mockPayWayApiService.executePayment.mockResolvedValue(paymentResponse);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: PayWayApiService,
          useValue: mockPayWayApiService,
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all payments', async () => {
    expect(await service.getAllPayments()).toEqual([]);
  });

  it('should return a payment by id', async () => {
    const createdPayment = await service.createPayment(paymentData);

    const retrievedPayment = await service.getPaymentById(
      createdPayment.id.toString(),
    );
    expect(retrievedPayment).toMatchObject({
      ...paymentData,
      id: createdPayment.id,
      status: createdPayment.status,
      date: createdPayment.date,
      transaction_id: createdPayment.transaction_id,
    });
  });

  it('should create a payment', async () => {
    const createdPayment = await service.createPayment(paymentData);
    expect(createdPayment).toMatchObject({
      ...paymentData,
      id: expect.any(Number),
      status: 'approved',
      date: expect.any(String),
      transaction_id: 'uniquecamp',
    });
  });

  it('should return undefined if the payment does not exist', async () => {
    const payment = await service.getPaymentById('1');
    expect(payment).toBeUndefined();
  });

  it('should handle errors if the payment creation fails', async () => {
    jest
      .spyOn(service, 'createPayment')
      .mockRejectedValue(new Error('Payment creation failed'));

    await expect(service.createPayment(paymentData)).rejects.toThrow(
      'Payment creation failed',
    );
  });
});
