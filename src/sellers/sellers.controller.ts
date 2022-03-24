import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  Res,
  HttpStatus,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../utils/file-uploading.utils';
<<<<<<< Updated upstream
import { Seller } from '../schemas/sellerAuth.schema';
=======
import { Seller } from '../models/sellerAuth.schema';

>>>>>>> Stashed changes

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  @UseInterceptors(
    //Todo : limit the uploaded image count depend on seller rank
    FilesInterceptor('productImage', 1, {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
    }),
  )
  async create(
    @Res() res,
    @Body() seller: Seller,
    @UploadedFile() files,
  ): Promise<Seller> {
    try {
      //   const newProduct = await this.productService.create(product);
      const {
        sellerFirstName,
        sellerLastName,
        sellerEmail,
        sellerPassword,
        sellerRole,
        sellerType,
        sellerStatus,
      } = seller;

      await this.sellersService.create({
        sellerFirstName,
        sellerLastName,
        sellerEmail,
        sellerPassword,
        sellerRole,
        sellerType,
        sellerStatus,
        sellerFile: files,
      });
      return res.status(HttpStatus.CREATED).json({
        message: 'seller created successfully',
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Get()
  async findAll(@Res() res): Promise<Seller[]> {
    try {
      const sellers = await this.sellersService.findAll();
      return res.status(HttpStatus.OK).json({
        sellers,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const seller = await this.sellersService.findOne(id);
      return res.status(HttpStatus.OK).json({
        seller,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Put(':id')
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() product: Seller,
  ): Promise<Seller> {
    try {
      const updatedSeller = await this.sellersService.update(id, product);
      return res.status(HttpStatus.OK).json({
        updatedSeller,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    try {
      const deletedSeller = await this.sellersService.remove(id);
      return res.status(HttpStatus.OK).json({
        deletedSeller,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
