import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImage: [
    {
      type: String,
    },
  ],
  productCategory: { type: String, required: true },
  productQuantity: { type: Number, required: true },
  productSeller: { type: String, required: true },
  productStatus: { type: String, default: 'Available' },
  productCreatedAt: { type: Date, default: Date.now },
  productBrand: { type: String, required: true },
});
