import { Injectable } from '@nestjs/common';
import {
  Deliverymen,
  DeliverymenDocument,
} from 'src/schemas/deliverymen.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DeliverymenService {
  constructor(
    @InjectModel(Deliverymen.name)
    private deliverymenModel: Model<DeliverymenDocument>,
  ) {}

  async create(deliverymen: Deliverymen): Promise<Deliverymen> {
    const newDeliverymen = new this.deliverymenModel(deliverymen);
    return await newDeliverymen.save();
  }

  async findAll(): Promise<Deliverymen[]> {
    return await this.deliverymenModel.find().exec();
  }

  async findOne(id: string) {
    return await this.deliverymenModel.findById(id).exec();
  }

  async update(id: string, deliverymen: Deliverymen): Promise<Deliverymen> {
    return await this.deliverymenModel.findByIdAndUpdate(id, deliverymen, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.deliverymenModel.findByIdAndRemove(id);
  }
}
