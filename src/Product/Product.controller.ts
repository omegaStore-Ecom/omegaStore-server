import { ProductService } from './Product.service';
import {
  Controller,
  Get,
  Post,
  Res,
  Param,
  Body,
  Put,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { Product } from './Product.schema';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';

const pngFileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.png') {
    req.fileValidationError = 'Invalid file type';
    return callback(new Error('Invalid file type'), false);
  }
  return callback(null, true);
};

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
  // @UseInterceptors(FilesInterceptor('files'))
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      fileFilter: pngFileFilter,
    }),
  )
  async create(
    @Res() res,
    @UploadedFiles() images,
    @Body() product: Product,
  ): Promise<Product> {
    try {
      // const createdProduct = await this.productService.create(product);
      return res.status(201).json(images);
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
