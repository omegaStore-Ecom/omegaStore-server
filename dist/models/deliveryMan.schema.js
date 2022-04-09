"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryMenSchema = void 0;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
exports.DeliveryMenSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'deliveryMan' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, default: 'active' },
    type: { type: String, required: true },
});
exports.DeliveryMenSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    }
    catch (err) {
        return next(err);
    }
});
//# sourceMappingURL=deliveryMan.schema.js.map