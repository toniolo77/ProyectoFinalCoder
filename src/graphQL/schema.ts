import { buildSchema } from "graphql";
import { getOneProduct, getProducts, addOneProduct } from "../controller/producto";

export const schema = buildSchema(
  `
    type Query {
        producto(id: String): Producto,
        productos(nombre: String, precio_desde: Float, precio_hasta: Float): [Producto],
    },
    type Mutation {
        addProduct(nombre: String!, descripcion: String!, codigo: String!, foto: String, precio: Float!, stock: Int!): Producto
    },
    type Producto {
        _id: String
        timestampt: Int
        nombre: String
        descripcion: String
        codigo: String
        foto: String
        precio: Float
        stock: Int 
    }
    `
);

export const root = {
  producto: getOneProduct,
  productos: getProducts ,
  addProduct: addOneProduct,
};
