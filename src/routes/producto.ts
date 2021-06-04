import express from "express";
const router = express.Router();
import { middlewares } from "../middlewares/permisos";
import {
  getProducto,
  addProducto,
  deleteProducto,
  updateProducto,
} from "../controller/producto";
import fieldsValidation from "../middlewares/field-validation";
const { param, query, body } = require("express-validator");

router.get(
  "/:id?",
  [
    middlewares.isLogin,
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
    fieldsValidation,
  ],
  getProducto
);

router.post(
  "/",
  [
    middlewares.isLogin,
    middlewares.isAdmin,
    body("nombre").isString(),
    body("descripcion").isString(),
    body("codigo").isString(),
    body("foto").isString(),
    body("stock").isNumeric().withMessage("debe ser un numero"),
    fieldsValidation,
  ],
  addProducto
);

router.put(
  "/:id",
  [
    middlewares.isLogin,
    middlewares.isAdmin,
    param("id").isMongoId().withMessage("tiene que ser un Object ID valido"),
    body("nombre").isString(),
    body("descripcion").isString(),
    body("codigo").isString(),
    body("foto").isString(),
    body("stock").isNumeric().withMessage("debe ser un numero"),
    fieldsValidation,
  ],
  updateProducto
);

router.delete(
  "/:id",
  [
    middlewares.isLogin,
    middlewares.isAdmin,
    param("id").isMongoId().withMessage("tiene que ser un Object ID valido"),
    fieldsValidation,
  ],
  deleteProducto
);

export default router;
