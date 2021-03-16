import { mysql_connect } from "./../DB/mysql_connect";
//Connect to DB
const knex = require("knex")(mysql_connect);

export interface Producto {
  id: number;
  timestampt: number;
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: boolean;
}

export class ProductoModel {
  constructor() {}

  getProducto = async (id: number): Promise<Producto | undefined> => {
    const producto = await knex.from("productos").select("*").where("id", "=", id).limit(1);
    return producto.length ? producto[0] : undefined;
  };

  getProductos = async (): Promise<Producto[]> => {
    return knex.from("productos").select("*");
  };

  deleteProducto = async (id: number): Promise<boolean> => {
    const cantDeletedRows = await knex("productos")
      .where("id", "=", id)
      .delete();
    return Number(cantDeletedRows) > 0 ;
  };

  addProducto = async (
    nombre: string,
    descripcion: string,
    codigo: string,
    foto: string,
    precio: number,
    stock: boolean
  ): Promise<Producto | undefined> => {
    const newProducto = {
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    };

    const newId = await knex("productos").insert(newProducto);
    return this.getProducto(newId);
  };

  updateProducto = async (
    id: number,
    nombre: string,
    descripcion: string,
    codigo: string,
    foto: string,
    precio: number,
    stock: boolean
  ): Promise<Producto | undefined> => {
    let newProducto = {
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    };

    const updatedProducts = await knex("productos")
      .where("id", "=", id)
      .update(newProducto);
    if (!updatedProducts) return;

    return this.getProducto(id);
  };
}
