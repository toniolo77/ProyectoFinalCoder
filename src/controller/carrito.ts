import { Request, Response } from "express";
import { CarritoModel } from "../model/carrito";

const carrito = new CarritoModel(); 

export const getProductosCarrito = async (req: Request, res: Response) => {
  try {
    const { id_carrito } = req.params;
    if (!id_carrito)
      res
        .status(400)
        .send(
          JSON.stringify({ error: -3, descripcion: "Parametros incorrectos" })
        );
    const productos = await carrito.getProductosCarrito(Number(id_carrito));
    return productos
      ? res.json(productos)
      : res
          .status(400)
          .send(
            JSON.stringify({ error: -3, descripcion: "No existe el carrito" })
          );
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

export const addProductoCarrito = async (req: Request, res: Response) => {
  try {
    let id_carrito = req.params?.id_carrito !== undefined
      ? Number(req.params?.id_carrito)
      : -1;
    const id_producto = req.body?.id_producto !==undefined
      ? Number(req.body?.id_producto)
      : -1;
    if (id_carrito === -1) id_carrito = (await carrito.createCarrito()).id;
    if (id_producto < 0)
      res
        .status(400)
        .send(
          JSON.stringify({ error: -3, descripcion: "Parametros incorrectos" })
        );

    const newCarrito = await carrito.addProducto(id_carrito, id_producto);
    newCarrito
      ? res.json(newCarrito)
      : res.status(400).send(
          JSON.stringify({
            error: -3,
            descripcion:
              "No existe el carrito o el producto, para crear un carrito envie el mismo metodo sin id_carrito",
          })
        );
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

export const deleteProducto = async (req: Request, res: Response) => {
  try {
    const { id_carrito } = req.params;
    const { id_producto } = req.body;
    if ( id_carrito === undefined || id_producto === undefined)
      res
        .status(400)
        .send(
          JSON.stringify({ error: -3, descripcion: "Parametros incorrectos" })
        );
    const deletedProdCarrito = await carrito.deleteProducto(
      Number(id_carrito),
      Number(id_producto)
    );
    deletedProdCarrito
      ? res.json(deletedProdCarrito)
      : res.status(400).send(
          JSON.stringify({
            error: -3,
            descripcion: "No existe el carrito o el producto",
          })
        );
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
