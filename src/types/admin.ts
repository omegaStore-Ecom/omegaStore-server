import { Document } from 'mongoose';

export interface Admin extends Document {
   role: string;
   email: string;
   password: string;

}
