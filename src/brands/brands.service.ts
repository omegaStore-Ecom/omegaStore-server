import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand, BrandDocument} from 'src/schemas/brand.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {

  constructor(@InjectModel(Brand.name) private brandModel: Model<BrandDocument>) {}

    async create(createBrandDto: CreateBrandDto): Promise<Brand> {
      return new this.brandModel(createBrandDto).save();

     } 



  findAll() {
    return this.brandModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return this.brandModel.deleteOne({id});
  }
}
