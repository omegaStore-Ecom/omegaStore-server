import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './Product.schema';
import { Model } from 'mongoose';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(product: Product): Promise<ProductDocument> {
    const newProduct = new this.productModel({
      ...product,
    });
    return newProduct.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, product: Product): Promise<ProductDocument> {
    return this.productModel
      .findByIdAndUpdate(id, product, { new: true })
      .exec();
  }
}
