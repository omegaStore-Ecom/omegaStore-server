import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Categorie, CategorieSchema } from 'src/schemas/categorie.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Categorie.name, schema: CategorieSchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
