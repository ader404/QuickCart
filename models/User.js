import mongoose from "mongoose";
// Remove unused import
// import { unique } from "next/dist/build/utils";   

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Fix: 'string' to 'String'
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    cartItems: { type: Object, default: {} }, // Fix: renamed from 'cqrtItem' to 'cartItems'
}, { minimize: false });

const User = mongoose.models.User || mongoose.model('User', userSchema); // Fix: capitalized 'User'
export default User;