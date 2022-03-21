import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument} from 'src/schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private OrderModel: Model<OrderDocument>) {}

  
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // let price = 0;
    // let allProducts= [];  
    // const totale = await this.OrderModel.find()
    const order= await new this.OrderModel(createOrderDto).save();
  //   await Promise.all(order.orders.map(async (element) => {
  //     console.log(element)
  //     const orderr = await this.OrderModel.findById({
  //         _id: element
  //     })
  //     allProducts.push(orderr)
  //     prix += orderr.price

  // }))
  console.log(order)
    return order ;     
   }

  findAll() {
    return this.OrderModel.find();
  }

  getOrderByCustomer(_id) {
    return this.OrderModel.find({customer:_id}); ;
  }

  

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return this.OrderModel.deleteOne({id});
  }
}
