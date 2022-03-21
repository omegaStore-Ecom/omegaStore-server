import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Product } from './product.schema';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';

@Controller('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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
  async creatProduct(
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

      await this.productService.create({
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
  async fetchAll(@Res() res): Promise<Product[]> {
    try {
      const products = await this.productService.readAll();
      return res.status(HttpStatus.OK).json({
        products,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Get('/:id')
  async findById(@Res() res, @Param('id') id: string) {
    try {
      const product = await this.productService.readById(id);
      return res.status(HttpStatus.OK).json({
        product,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Put('/:id')
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<Product> {
    try {
      const updatedProduct = await this.productService.update(id, product);
      return res.status(HttpStatus.OK).json({
        updatedProduct,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id: string) {
    try {
      const deletedProduct = await this.productService.delete(id);
      return res.status(HttpStatus.OK).json({
        deletedProduct,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
