import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument} from 'src/schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
 
  constructor(@InjectModel(Product.name) private ProductModel: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return new this.ProductModel(createProductDto).save();
   }
  findAll() {
    return `This action returns all products`;
  }

  find (categorie: string) {
    return this.ProductModel.find({categorie});
  }

  findByBrand (brand: string) {
    return this.ProductModel.find({brand});
  }

 
  remove(id: number) {
    return this.ProductModel.deleteOne({id});
  }
}
