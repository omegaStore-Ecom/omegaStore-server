import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/types/product';
import { FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';
import { diskStorage } from 'multer';
import { CurrentUser, Roles, RolesGuard } from 'src/role/role.guard';
import { Seller } from 'src/types/users';
import {SellerService} from "../seller/sellerservice";
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService, private sellerService: SellerService) {}

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
  async create(@Body() product, @Res() res, @UploadedFiles() images , @CurrentUser() user) {
    if (!user) return res.status(401).json({message: 'You must be logged in to create a product'});
    const currentUser : Seller = await this.sellerService.findOne(user.id)
    if(currentUser.status === 'notActivate') return res.status(401).json({message: 'Your account is pending'});

    if(currentUser.productLimit > 10 && currentUser.type === 'Starter') return res.status(401).json({message: 'You have reached your product limit'});
    if(currentUser.productLimit > 50  && currentUser.type === 'Pro') return res.status(401).json({message: 'You have reached your product limit'});

    return this.productService.createProduct(product, res, images , currentUser);
  }

  @Get()
  // @Roles('seller')
  // @UseGuards(RolesGuard)
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
  async update(@Res() res, @Param('id') id: string, @Body() product: any) {
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

  @Delete(':id')
  async delete(@Res() res, @Param('id') id: string , @CurrentUser() user) {
    return await this.productService.deleteProduct(id, res, user);
  }
}
