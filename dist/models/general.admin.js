"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralAdminSchema = void 0;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
exports.GeneralAdminSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'GAdmin' },
});
exports.GeneralAdminSchema.pre('save', async function (next) {
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
//# sourceMappingURL=general.admin.js.map