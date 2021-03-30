import { Request, Response } from "express";
import { ProductoModel } from "../model/producto";

export const getProducto = async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    return id
      ? res.json(await ProductoModel.findById(id))
      : res.json(await ProductoModel.find());
    } catch (err) {
      next(err)
    }
};

export const deleteProducto = async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    if (!id)
      res
        .status(400)
        .json({ error: -3, descripcion: "Parametros incorrectos" });

    const deletedProducto = await ProductoModel.findByIdAndRemove(id);
    res.json(deletedProducto);
  } catch (err) {
    next(err)
  }
};

export const addProducto = async (req: Request, res: Response, next) => {
  try {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    if (!nombre || !descripcion || !codigo || !foto || !precio || !stock)
      res
        .status(400)
        .send(
          JSON.stringify({ error: -3, descripcion: "Parametros incorrectos" })
        );

    const product = await new ProductoModel({
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    }).save();
    res.json(product);
  } catch (err) {
    next(err)
  }
};

export const updateProducto = async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    if (!id || !nombre || !descripcion || !codigo || !foto || !precio || !stock)
      res
        .status(400)
        .send(
          JSON.stringify({ error: -3, descripcion: "Parametros incorrectos" })
        );

    let product = await ProductoModel.findById(id);
    product = Object.assign(product, {
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });
    await product.save();

    res.json(product);
  } catch (err) {
    next(err)
  }
};
