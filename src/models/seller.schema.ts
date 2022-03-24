import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const SellerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: 'seller' },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  type: { type: String, default: 'Starter' },
  generatedIncome: { type: Number, default: 0 },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
  file: { type: String, required: true },
});

SellerSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
