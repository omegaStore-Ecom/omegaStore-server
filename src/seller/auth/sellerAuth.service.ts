import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SellerAuth, SellerAuthDocument } from '../../schemas/sellerAuth.schema';

@Injectable()
export class SellerAuthService {
  constructor(
    @InjectModel(SellerAuth.name)
    private sellerAuthModel: Model<SellerAuthDocument>,
  ) {}

  async create(seller: SellerAuth): Promise<SellerAuth> {
    const newSeller = new this.sellerAuthModel(seller);
    return newSeller.save();
  }

  async readAll(): Promise<SellerAuth[]> {
    return await this.sellerAuthModel.find().exec();
  }

  async readById(id): Promise<SellerAuth> {
    return await this.sellerAuthModel.findById(id).exec();
  }

  async update(id, product: SellerAuth): Promise<SellerAuth> {
    return await this.sellerAuthModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.sellerAuthModel.findByIdAndRemove(id);
  }
}
