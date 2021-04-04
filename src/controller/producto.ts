import { EMPTY_VALUE } from "./../utils/common";
import { Request, Response } from "express";
import { ProductoModel } from "../model/producto";
const { validationResult } = require('express-validator');

const crearFiltros = (params) => {
  const { nombre, precio_desde, precio_hasta } = params;
  const filtros: any[] = [];

  if (nombre)
    filtros.push({ nombre: { $regex: `(.)*${nombre}(.)*`, $options: "i" } });
  if (precio_desde) filtros.push({ precio: { $gt: precio_desde } });
  if (precio_hasta) filtros.push({ precio: { $lt: precio_hasta } });

  return filtros.length > 0 ? { $and: filtros } : {};
};

export const getProducto = async (req: Request, res: Response, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {     
      return res.status(422).json({ errors: errors.array() });   
    }
    
    const { id } = req.params;
    return id
      ? res.json((await ProductoModel.findById(id)) ?? EMPTY_VALUE)
      : res.json(await ProductoModel.find(crearFiltros(req.query)));
  } catch (err) {
    next(err);
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
    next(err);
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
    next(err);
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
    next(err);
  }
};
