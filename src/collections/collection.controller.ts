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
  UploadedFile,
  UseGuards,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Product } from 'src/types/product';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';
import { diskStorage } from 'multer';
import { CurrentUser, Roles, RolesGuard } from 'src/role/role.guard';
import { Seller } from 'src/types/users';
import { SellerService } from '../seller/sellerservice';

@Controller('collection')
export class CollectionController {
  constructor(
    private readonly collectionService: CollectionService,
    private sellerService: SellerService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('collectionImage', {
      storage: diskStorage({
        destination: './upload/collectionImg',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async create(
    @Body() collection,
    @Res() res,
    @UploadedFile() images,
    @CurrentUser() user,
  ) {
    if (!user)
      return res
        .status(401)
        .json({ message: 'You must be logged in to create a collection' });
    const currentUser: Seller = await this.sellerService.findOne(user.id);
    if (currentUser.status === 'notActivate')
      return res.status(401).json({ message: 'Your account is pending' });

    return this.collectionService.createCollection(
      collection,
      res,
      images,
      currentUser,
    );
  }

  @Get()
  // @Roles('seller')
  // @UseGuards(RolesGuard)
  async findAll(@Res() res) {
    return await this.collectionService.findAll(res);
  }

  @Get(':id')
  async findById(@Res() res, @Param('id') id: string) {
    try {
      const collection = await this.collectionService.findOne(id, res);
      return res.status(HttpStatus.OK).json({
        collection,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Put(':id')
  async update(@Res() res, @Param('id') id: string, @Body() collection: any) {
    return await this.collectionService.updateCollection(id, collection, res);
  }

  @Put('/:id/image')
  @UseInterceptors(
    FileInterceptor('collectionImage', {
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
    @UploadedFile() images,
  ) {
    return await this.collectionService.updateCollectionImage(id, images, res);
  }

  @Delete(':id')
  async delete(@Res() res, @Param('id') id: string) {
    return await this.collectionService.deleteCollection(id, res);
  }
}
