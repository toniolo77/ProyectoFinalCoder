import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    profile: { type: String, required: true },
    carrito: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrito'}, 
});

export const UserModel = mongoose.model("User", userSchema);
