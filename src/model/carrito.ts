import { Producto } from './producto';

import mongoose from 'mongoose';
const  {Schema }  = mongoose;

const carritoSchema = new Schema({
  timestampt: { type: Date, required: true, default: Date.now},
  productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto'}],
});


export interface Carrito {
  id: number;
  timestampt: number;
  productos: Producto[];
}

export const CarritoModel = mongoose.model('Carrito',carritoSchema);
