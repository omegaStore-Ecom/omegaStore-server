import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/types/payload';
import { LoginDTO } from './login.dto';
import { Seller } from 'src/types/users';

@Injectable()
export class SellerService {
  constructor(@InjectModel('Seller') private SellerModel: Model<Seller>) {}

  async create(Seller: Seller, file, res) {
    const { email } = Seller;
    const existSeller = await this.SellerModel.findOne({ email });
    if (existSeller) {
      throw new HttpException('seller already exists', HttpStatus.BAD_REQUEST);
    }
    const createdSeller = new this.SellerModel(Seller);
    createdSeller.file = file[0]?.filename;
    await createdSeller.save();

    return res.status(200).json(this.sanitizeAdmin(createdSeller));
  }

  async findAll(res) {
    try {
      const deliverymen = await this.SellerModel.find();
      return res.status(HttpStatus.OK).json({
        deliverymen,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(id, seller, res) {
    try {
      const updatedSeller = await this.SellerModel.findByIdAndUpdate(
        id,
        seller,
        { new: true },
      );
      return res.status(HttpStatus.OK).json({
        updatedSeller,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async disableSeller(id, res) {
    try {
      const updatedSeller = await this.SellerModel.findOneAndUpdate(id, {
        $set: {
          firstName: 'disabled',
        },
      });
      return res.status(HttpStatus.OK).json({
        updatedSeller,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.SellerModel.findOne({ email });
  }

  async findByLogin(seller: LoginDTO) {
    const { email, password } = seller;
    const existSeller = await this.SellerModel.findOne({ email });
    if (!existSeller) {
      throw new HttpException('Seller doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (
      (await bcrypt.compare(password, existSeller.password)) &&
      existSeller.role === 'seller'
    ) {
      return this.sanitizeAdmin(existSeller);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }
  sanitizeAdmin(existSeller: Seller) {
    const sanitized = existSeller.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async validateAdmin(payload: Payload) {
    return await this.findByPayload(payload);
  }
}
