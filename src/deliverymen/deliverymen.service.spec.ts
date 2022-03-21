import { Test, TestingModule } from '@nestjs/testing';
import { DeliverymenService } from './deliverymen.service';

describe('DeliverymenService', () => {
  let service: DeliverymenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliverymenService],
    }).compile();

    service = module.get<DeliverymenService>(DeliverymenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
