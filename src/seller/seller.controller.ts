import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  SetMetadata,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard } from '../role/role.guard';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';
import { LoginDTO } from './login.dto';
import { SellerService } from './sellerservice';
import { Seller } from 'src/types/users';
import { FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';
import { diskStorage } from 'multer';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Get('/onlyauthG')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async hiddenInformation() {
    return 'hidden information';
  }

  @Post('register')
  @UseInterceptors(
    FilesInterceptor('files',1, {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async register(

    @Res() res,
    @Body() registerDTO: Seller,
    @UploadedFiles() file,
  ) {
    const Seller = await this.sellerService.create(registerDTO , file , res);
    const payload = {
      email: Seller.email,
      role: Seller.role,
    };

    const token = await this.signPayload(payload);
    return { Seller, token };

  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const Seller = await this.sellerService.findByLogin(loginDTO);
    const payload = {
      email: Seller.email,
      role: Seller.role,
    };
    const token = await this.signPayload(payload);
    return { Seller, token };
  }

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }

  // crud

  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
  async getALLSeller(@Res() res) {
    return this.sellerService.findAll(res);
  }

  @Put(':id')
  async updateSeller(
    @Body() seller: Seller,
    @Res() res,
    @Param('id') id: string,
  ) {
    return this.sellerService.update(id, seller, res);
  }

  @Put(':id')
  async disableSeller(@Res() res, @Param('id') id: string) {
    return this.sellerService.disableSeller(id, res);
  }
}
