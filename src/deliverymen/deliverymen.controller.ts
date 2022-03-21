import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Deliverymen } from 'src/schemas/deliverymen.schema';
import { DeliverymenService } from './deliverymen.service';

@Controller('deliverymen')
export class DeliverymenController {
  constructor(private readonly deliverymenService: DeliverymenService) {}

  @Post()
  async create(
    @Res() res,
    @Body() deliverymen: Deliverymen,
  ): Promise<Deliverymen> {
    try {
      const newDeliveryman = await this.deliverymenService.create(deliverymen);
      return res.status(HttpStatus.CREATED).json({
        newDeliveryman,
        message: 'Delivery Man created successfully',
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Get()
  async findAll(@Res() res): Promise<Deliverymen[]> {
    try {
      const deliverymen = await this.deliverymenService.findAll();
      return res.status(HttpStatus.OK).json({
        deliverymen,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const deliveryman = await this.deliverymenService.findOne(id);
      return res.status(HttpStatus.OK).json({
        deliveryman,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Patch(':id')
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() deliverymen: Deliverymen,
  ): Promise<Deliverymen> {
    try {
      const updatedDeliveryMan = await this.deliverymenService.update(
        id,
        deliverymen,
      );
      return res.status(HttpStatus.OK).json({
        updatedDeliveryMan,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    try {
      const deletedDeliveryman = await this.deliverymenService.remove(id);
      return res.status(HttpStatus.OK).json({
        deletedDeliveryman,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
