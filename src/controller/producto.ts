import { ResponseStatus } from "./../utils/responses";
import { Request, Response } from "express";
import { ProductoModel } from "../model/producto";
import { EMPTY_VALUE } from "./../utils/common";

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
    const { id } = req.params;
    return id
      ? res.json((await ProductoModel.findById(id)) ?? EMPTY_VALUE)
      : res.json(await ProductoModel.find(crearFiltros(req.query)));
  } catch (err) {
    next(err);
  }
};

export const getOneProduct = async (args) => {
  try {
    if (!args.id) {
      return { err: ResponseStatus.ERROR, msg: "Falta atributo id", value: "" };
    }

    return await ProductoModel.findById(args.id);
  } catch (err) {
    return {
      err: ResponseStatus.ERROR,
      msg: "Se produjo un error interno",
      value: "",
    };
  }
};

export const getProducts = async (args) => {
  try {
    return await ProductoModel.find(args);
  } catch (err) {
    return {
      err: ResponseStatus.ERROR,
      msg: "Se produjo un error interno",
      value: "",
    };
  }
};

export const deleteProducto = async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    const deletedProducto = await ProductoModel.findByIdAndRemove(id);
    res.json(deletedProducto);
  } catch (err) {
    next(err);
  }
};

export const addProducto = async (req: Request, res: Response, next) => {
  try {
    const product = await addOneProduct(req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const addOneProduct = async (args) => {
  try {
    const { nombre, descripcion, codigo, foto, precio, stock } = args;
    const product = await new ProductoModel({
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    }).save();
    return product;
  } catch (err) {
    return {
      err: ResponseStatus.ERROR,
      msg: "Se produjo un error interno",
      value: "",
    };
  }
};

export const updateProducto = async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
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
