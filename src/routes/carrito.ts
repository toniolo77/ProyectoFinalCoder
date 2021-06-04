import express from "express";
import { middlewares } from "../middlewares/permisos";
const router = express.Router();
import {
  getProductosCarrito,
  addProductoCarrito,
  deleteProducto,
} from "../controller/carrito";
import fieldsValidation from "../middlewares/field-validation";
const { body } = require("express-validator");

router.get("/", middlewares.isLogin, getProductosCarrito);
router.post(
  "/",
  [middlewares.isLogin, body("id_producto").isMongoId(), fieldsValidation],
  addProductoCarrito
);
router.delete(
  "/",
  [middlewares.isLogin, body("id_producto").isMongoId(), fieldsValidation],
  deleteProducto
);

export default router;