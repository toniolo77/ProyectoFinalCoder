import { Request, Response } from "express";
import { ProductoModel } from "../model/producto";

const prod = new ProductoModel();

export const getProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    return id
      ? res.json(await prod.getProducto(Number(id)))
      : res.json(await prod.getProductos());
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

export const deleteProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      res
        .status(400)
        .json({ error: -3, descripcion: "Parametros incorrectos" });

    const deletedProducto = await prod.deleteProducto(Number(id));

    return deletedProducto
      ? res.json(deleteProducto)
      : res
          .status(400)
          .send(
            JSON.stringify({ error: -3, descripcion: "No existe producto" })
          );
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

export const addProducto = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    if (!nombre || !descripcion || !codigo || !foto || !precio || !stock)
      res
        .status(400)
        .send(
          JSON.stringify({ error: -3, descripcion: "Parametros incorrectos" })
        );

    res.json(
      await prod.addProducto(nombre, descripcion, codigo, foto, precio, stock)
    );
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

export const updateProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    if (!id || !nombre || !descripcion || !codigo || !foto || !precio || !stock)
      res
        .status(400)
        .send(
          JSON.stringify({ error: -3, descripcion: "Parametros incorrectos" })
        );

    const updatedProducto = await prod.updateProducto(
      Number(id),
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock
    );
    return updatedProducto
      ? res.json(updatedProducto)
      : res
          .status(400)
          .send(
            JSON.stringify({ error: -3, descripcion: "No existe producto" })
          );
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
