import { ProductService } from './Product.service';
import {
  Controller,
  Get,
  Post,
  Res,
  Param,
  Body,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Product } from './Product.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
@Controller('Products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@Res() res): Promise<Product[]> {
    try {
      const products = await this.productService.findAll();
      return res.status(200).json({ products });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Get('/:id')
  async findOne(@Res() res, @Param('id') id: string): Promise<Product> {
    try {
      const product = await this.productService.findOne(id);
      return res.status(200).json({ product });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Res() res,
    @Body() product: Product,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<Product> {
    try {
      // const createdProduct = await this.productService.create(product);
      return res.status(201).json({ images });
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
      return res.status(200).json({ updatedProduct });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
