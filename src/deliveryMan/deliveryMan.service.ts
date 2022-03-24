import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/types/payload';
import { LoginDTO } from './login.dto';
import { DeliveryMan } from 'src/types/users';

@Injectable()
export class DeliveryMenService {
  constructor(
    @InjectModel('DeliveryMan') private DeliveryMenModel: Model<DeliveryMan>,
  ) {}

  async create(DeliveryMan: DeliveryMan) {
    const { email } = DeliveryMan;
    const Admin = await this.DeliveryMenModel.findOne({ email });
    if (Admin) {
      throw new HttpException(
        'deliveryMan already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdDeliveryMan = new this.DeliveryMenModel(DeliveryMan);
    await createdDeliveryMan.save();
    return this.sanitizeAdmin(createdDeliveryMan);
  }

  async findAll(res) {
    try {
      const deliverymen = await this.DeliveryMenModel.find();
      return res.status(HttpStatus.OK).json({
        deliverymen,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(id, deliveryMan, res) {
    try {
      const updatedDeliveryMan = await this.DeliveryMenModel.findByIdAndUpdate(
        id,
        deliveryMan,
        { new: true },
      );
      return res.status(HttpStatus.OK).json({
        updatedDeliveryMan,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async disableDeliveryMan(id, res) {
    try {
      const updatedDeliveryMan = await this.DeliveryMenModel.findOneAndUpdate(id, {
        $set: {
          firstName: 'disabled',
        },
      });
      return res.status(HttpStatus.OK).json({
        updatedDeliveryMan,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.DeliveryMenModel.findOne({ email });
  }

  async findByLogin(deliveryMan: LoginDTO) {
    const { email, password } = deliveryMan;
    const existDeliveryMan = await this.DeliveryMenModel.findOne({ email });
    if (!existDeliveryMan) {
      throw new HttpException(
        'DeliveryMan doesnt exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      (await bcrypt.compare(password, existDeliveryMan.password)) &&
      existDeliveryMan.role === 'DeliveryMan'
    ) {
      return this.sanitizeAdmin(existDeliveryMan);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }
  sanitizeAdmin(existDeliveryMan: DeliveryMan) {
    const sanitized = existDeliveryMan.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async validateAdmin(payload: Payload) {
    return await this.findByPayload(payload);
  }
}
