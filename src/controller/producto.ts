import { Request, Response } from "express";
import { ProductoModel } from "../model/producto";

export const getProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    return id
      ? res.json(await ProductoModel.findById(id))
      : res.json(await ProductoModel.find());
  } catch (err) {
    res
      .status(500)
      .json({
        error: -3,
        descripcion: "Se produjo un error al intentar realizar la operacion",
      });
  }
};

export const deleteProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      res
        .status(400)
        .json({ error: -3, descripcion: "Parametros incorrectos" });

    const deletedProducto = await ProductoModel.findByIdAndRemove(id);
    res.json(deletedProducto);
  } catch (err) {
    res
      .status(500)
      .json({
        error: -3,
        descripcion: "Se produjo un error al intentar realizar la operacion",
      });
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
    console.log(err);
    res
      .status(500)
      .json({
        error: -3,
        descripcion: "Se produjo un error al intentar realizar la operacion",
      });
  }
};
