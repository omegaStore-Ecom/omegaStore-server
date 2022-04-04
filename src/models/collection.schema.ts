import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  collectionName: { type: String, required: true },
  collectionDescription: { type: String, required: true },
  status: { type: String, default: 'active' },
  collectionOwner: { type: String, required: true },
  collectionImage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
