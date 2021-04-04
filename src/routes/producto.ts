import express from "express";
const router = express.Router();
import { middlewares } from "../middlewares/permisos";
import {
  getProducto,
  addProducto,
  deleteProducto,
  updateProducto,
} from "../controller/producto";
const { param, query, validationResult } = require("express-validator");

router.get(
  "/:id?",
  [
    param("id").optional().isMongoId(),
    query("nombre").optional().isString(),
    query("precio_desde").optional().isNumeric().withMessage("El campo debe ser numerico"),
    query("precio_hasta").optional().isNumeric(),
  ],
  getProducto
);
router.post("/", middlewares.isAdmin, addProducto);
router.put("/:id", middlewares.isAdmin, updateProducto);
router.delete("/:id", middlewares.isAdmin, deleteProducto);

export default router;
