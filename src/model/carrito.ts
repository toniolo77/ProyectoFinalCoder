import { mysql_connect } from "./../DB/mysql_connect";
import { Producto, ProductoModel } from "./producto";
//Connect to DB
const knex = require("knex")(mysql_connect);

export interface Carrito {
  id: number;
  timestampt: number;
  productos: Producto[];
}

export class CarritoModel {
  constructor() {}

  createCarrito = async (): Promise<number> => {
    const newCarrito= await knex("carritos").insert({});
    return newCarrito[0];
  };

  getCarrito = async (id: number): Promise<Carrito | undefined> => {
    const carrito = await knex
      .select("carritos.*")
      .from("carritos")
      .where("carritos.id", "=", id);
    if (!carrito.length) return ;

    const carritoProductos: Carrito = {
      ...carrito[0],
      productos: await this.getProductosCarrito(id),
    };
    
    return carritoProductos;
  };

  getProductosCarrito = async (id: number): Promise<Producto[] | undefined> => {
    return knex
      .select("productos.*")
      .from("carrito_producto")
      .innerJoin("productos", "carrito_producto.id_producto", "productos.id")
      .where("id_carrito", "=", id);
  };

  addProducto = async (
    id_carrito: number,
    id_producto: number
  ): Promise<Carrito | undefined> => {
    const prod = new ProductoModel();
    const producto = await prod.getProducto(id_producto);
    const carrito = await this.getCarrito(id_carrito);
    if (!producto || !carrito) return;
    await knex("carrito_producto").insert({ id_carrito, id_producto });

    return this.getCarrito(id_carrito);
  };

  deleteProducto = async (
    id_carrito: number,
    id_producto: number
  ): Promise<boolean> => {
    const cantDeletedRows = await knex("carrito_producto")
      .where({ id_carrito, id_producto })
      .delete();
    return cantDeletedRows;
  };
}
