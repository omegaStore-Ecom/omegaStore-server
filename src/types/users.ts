import { Document } from 'mongoose';


export interface Admin extends Document {
  role: string;
  email: string;
  password: string;
}

export interface DeliveryMan extends Document {
  role: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  status: string;
  type: string;
}
