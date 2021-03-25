import mongoose from 'mongoose';
const  {Schema }  = mongoose;


const productSchema = new Schema({
  timestampt: { type: Date, required: true, default: Date.now},
  nombre: { type: String, required: true},
  descripcion: { type: String, required: true},
  codigo: { type: String, required: true},
  foto: { type: String, required: true},
  precio: { type: Number, required: true},
  stock: { type: Number, required: true, min:0},

});

export interface Producto {
  id: number;
  timestampt: number;
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
}

export const ProductoModel = mongoose.model('Producto',productSchema);

