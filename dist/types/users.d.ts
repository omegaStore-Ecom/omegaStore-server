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
export interface Customer extends Document {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    role: string;
}
export interface Seller extends Document {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    role: string;
    address: string;
    city: string;
    state: boolean;
    zip: string;
    country: string;
    status: string;
    file: string;
    type: string;
    generatedIncome: number;
    productLimit: number;
}
