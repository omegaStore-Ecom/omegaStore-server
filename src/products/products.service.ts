import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(product: Product): Promise<Product> {
    // return 'This action adds a new product';
    const newProduct = new this.productModel(product);
    return await newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    // return `This action returns all products`;
    return await this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    // return `This action returns a #${id} product`;
    return await this.productModel.findById(id).exec();
  }

  async update(id: string, product: Product): Promise<Product> {
    // return `This action updates a #${id} product`;
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }

  async remove(id: string): Promise<Product> {
    // return `This action removes a #${id} product`;
    return await this.productModel.findByIdAndRemove(id);
  }
}
