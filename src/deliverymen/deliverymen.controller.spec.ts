import { Test, TestingModule } from '@nestjs/testing';
import { DeliverymenController } from '../deliverymen/deliverymen.controller';
import { DeliverymenService } from '../deliverymen/deliverymen.service';

describe('DeliverymenController', () => {
  let controller: DeliverymenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliverymenController],
      providers: [DeliverymenService],
    }).compile();

    controller = module.get<DeliverymenController>(DeliverymenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
