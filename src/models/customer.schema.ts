import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const CustomerSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'customer' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  // address_1: { type: String, required: true },
  // address_2: { type: String, required: true },
  // city: { type: String, required: true },
  // state: { type: String, required: true },
  // zip: { type: String, required: true },
  // country: { type: String, required: true },
});

CustomerSchema.pre('save', async function(next: mongoose.HookNextFunction) {
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
