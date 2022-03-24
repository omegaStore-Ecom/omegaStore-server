import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/types/product';
import { FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';
import { diskStorage } from 'multer';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('productImage', 20, {
      storage: diskStorage({
        destination: './upload/productImg',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(@Body() product, @Res() res, @UploadedFiles() images) {
    return this.productService.createProduct(product, res, images);
    res.status(201).json({
      product,
    });
  }

  @Get()
  async findAll(@Res() res) {
    return await this.productService.findAll(res);
  }

  @Get(':id')
  async findById(@Res() res, @Param('id') id: string) {
    try {
      const product = await this.productService.findOne(id, res);
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
    return await this.productService.updateProduct(id, product, res);
  }

  @Put('/:id/image')
  @UseInterceptors(
    FilesInterceptor('productImage', 20, {
      storage: diskStorage({
        destination: './upload/productImg',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateImage(
    @Res() res,
    @Param('id') id: string,
    @UploadedFiles() images,
  ) {
    return await this.productService.updateProductImage(id, images, res);
  }
  @Put(':id/updateStatus')
  async updateStatus(@Res() res, @Param('id') id: string) {
    return await this.productService.updateProductStatus(id, res);
  }
}
