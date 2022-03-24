import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';
import { Product } from '../models/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    //Todo : limit the uploaded image count depend on seller rank
    FilesInterceptor('productImage', 20, {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async create(
    @Res() res,
    @Body() product: Product,
    @UploadedFiles() images,
  ): Promise<Product> {
    try {
      //   const newProduct = await this.productService.create(product);
      const {
        productName,
        productPrice,
        productDescription,
        productCategory,
        productBrand,
        productStatus,
        productQuantity,
      } = product;

      await this.productsService.create({
        productName,
        productPrice,
        productDescription,
        productCategory,
        productQuantity,
        productBrand,
        productStatus,
        productImage: images,
      });
      return res.status(HttpStatus.CREATED).json({
        message: 'Product created successfully',
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Get()
  async findAll(@Res() res): Promise<Product[]> {
    try {
      const products = await this.productsService.findAll();
      return res.status(HttpStatus.OK).json({
        products,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const product = await this.productsService.findOne(id);
      return res.status(HttpStatus.OK).json({
        product,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Put(':id')
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<Product> {
    try {
      const updatedProduct = await this.productsService.update(id, product);
      return res.status(HttpStatus.OK).json({
        updatedProduct,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    try {
      const deletedProduct = await this.productsService.remove(id);
      return res.status(HttpStatus.OK).json({
        deletedProduct,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
