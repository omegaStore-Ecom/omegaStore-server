
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer ,CustomerDocument} from 'src/schemas/customer.schema';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
    constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}

    async findOne(username: string): Promise<Customer | undefined> {
        console.log('partOne',this.customerModel.findOne({username}))
        return this.customerModel.findOne({username});

      }

//   async findOne(username: string): Promise<User | undefined> {
//     return this.users.find(user => user.username === username);
//   }
}