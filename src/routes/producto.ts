import express from "express";
const router = express.Router();
import { middlewares } from "../middlewares/permisos";
import {
  getProducto,
  addProducto,
  deleteProducto,
  updateProducto,
} from "../controller/producto";
const { param, query, body } = require("express-validator");

router.get(
  "/:id?",
  [
    param("id")
      .optional()
      .isMongoId()
      .withMessage("tiene que ser un Object ID valido"),
    query("nombre").optional().isString(),
    query("precio_desde")
      .optional()
      .isNumeric()
      .withMessage("debe ser un numero"),
    query("precio_hasta")
      .optional()
      .isNumeric()
      .withMessage("debe ser un numero"),
  ],
  getProducto
);

router.post(
  "/",
  [
    middlewares.isAdmin,
    body("nombre").isString(),
    body("descripcion").isString(),
    body("codigo").isString(),
    body("foto").isString(),
    body("stock").isNumeric().withMessage("debe ser un numero"),
  ],
  addProducto
);

router.put(
  "/:id",
  [
    middlewares.isAdmin,
    param("id")
      .isMongoId()
      .withMessage("tiene que ser un Object ID valido"),
    body("nombre").isString(),
    body("descripcion").isString(),
    body("codigo").isString(),
    body("foto").isString(),
    body("stock").isNumeric().withMessage("debe ser un numero"),
  ],
  updateProducto
);

router.delete(
  "/:id",
  [
    middlewares.isAdmin,
    param("id")
      .isMongoId()
      .withMessage("tiene que ser un Object ID valido"),
  ],
  deleteProducto
);

export default router;
