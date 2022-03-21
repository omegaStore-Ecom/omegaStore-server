import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Categorie, CategorieDocument} from 'src/schemas/categorie.schema';


@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Categorie.name) private CategorieModel: Model<CategorieDocument>) {}

    async create(createCategorieDto: CreateCategoryDto): Promise<Categorie> {
   return new this.CategorieModel(createCategorieDto).save();
     }
  findAll() {
    return this.CategorieModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return this.CategorieModel.deleteOne({id});
  }
}
