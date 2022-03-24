import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller, SellerDocument } from '../models/sellerAuth.schema';


@Injectable()
export class SellersService {
  constructor(
    @InjectModel(Seller.name) private sellerModel: Model<SellerDocument>,
  ) {}

  async create(seller: Seller): Promise<Seller> {
    const newSeller = new this.sellerModel(seller);
    return newSeller.save();
  }

  async findAll(): Promise<Seller[]> {
    return await this.sellerModel.find().exec();
  }

  async findOne(id: string): Promise<Seller> {
    return await this.sellerModel.findById(id).exec();
  }

  async update(id: string, product: Seller): Promise<Seller> {
    return await this.sellerModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }

  async remove(id: string): Promise<any> {
    return await this.sellerModel.findByIdAndRemove(id);
  }
}
