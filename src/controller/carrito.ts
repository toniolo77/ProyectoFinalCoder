import { Request, Response } from "express";
import { CarritoModel } from "../model/carrito";
import { ProductoModel } from "./../model/producto";

export const getProductosCarrito = async (req: Request, res: Response) => {
  try {
    const { id_carrito } = req.params;
    if (!id_carrito)
      res
        .status(400)
        .send(
          JSON.stringify({ error: -3, descripcion: "Parametros incorrectos" })
        );

    const productos = await CarritoModel.findById(id_carrito).populate(
      "productos"
    );
    res.json(productos);
  } catch (err) {
    res.status(500).json({
      error: -3,
      descripcion: "Se produjo un error al intentar realizar la operacion",
    });
  }
};

export const addProductoCarrito = async (req: Request, res: Response) => {
  try {
    const id_carrito = req.params?.id_carrito;
    const id_producto = req.body?.id_producto;

    if (!id_producto)
      res
        .status(400)
        .send(
          JSON.stringify({ error: -3, descripcion: "Parametros incorrectos" })
        );

    let carrito;
    const producto = await ProductoModel.findById(id_producto);
    if (!id_carrito) {
      carrito = await new CarritoModel().save();
    } else {
      carrito = await CarritoModel.findById(id_carrito);
    }

    carrito.productos.push(producto);
    await carrito.save();

    return res.json(carrito);
  } catch (err) {
    res.status(500).json({
      error: -3,
      descripcion:
        "Se produjo un error al intentar realizar la operacion, si quiere crear un carrito ingrese al mismo metodo sin el id de carrito",
    });
  }
};

export const deleteProducto = async (req: Request, res: Response) => {
  try {
    const { id_carrito } = req.params;
    const { id_producto } = req.body;
    if (id_carrito === undefined || id_producto === undefined)
      res
        .status(400)
        .send(
          JSON.stringify({ error: -3, descripcion: "Parametros incorrectos" })
        );

    const carrito = await CarritoModel.findById(id_carrito);
    carrito.productos = carrito.productos.filter(
      (p) => String(p._id) !== String(id_producto)
    );
    carrito.save();

    res.json({ msg: "Se elimino el producto correctamente" });
  } catch (err) {
    res.status(500).json({
      error: -3,
      descripcion: "Se produjo un error al intentar realizar la operacion",
    });
  }
};
