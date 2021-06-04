import { sendResponse } from "./../utils/responses";
import { Request, Response } from "express";
import { CarritoModel } from "../model/carrito";
import { ProductoModel } from "./../model/producto";

export const getProductosCarrito = async (req, res: Response, next) => {
  try {
    const productos = await CarritoModel.findById(req.user.carrito).populate(
      "productos"
    );

    sendResponse(res, productos, "");
  } catch (err) {
    next(err);
  }
};

export const addProductoCarrito = async (req, res: Response, next) => {
  try {
    const { id_producto } = req.body;

    const producto = await ProductoModel.findById(id_producto);
    const carrito = await CarritoModel.findById(req.user.carrito);

    carrito.productos.push(producto);
    await carrito.save();

    sendResponse(res, carrito, "Se agrego el producto correctamente");
  } catch (err) {
    next(err);
  }
};

export const deleteProducto = async (req, res: Response, next) => {
  try {
    const { id_producto } = req.body;

    const carrito = await CarritoModel.findById(req.user.carrito);
    carrito.productos = carrito.productos.filter(
      (p) => String(p._id) !== String(id_producto)
    );
    carrito.save();

    sendResponse(res, null, "Se elimino el producto correctamente");
  } catch (err) {
    next(err);
  }
};
