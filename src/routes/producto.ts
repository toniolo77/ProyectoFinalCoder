import express from "express";
const router = express.Router();
import { middlewares } from "../middlewares/permisos";
import {
  getProducto,
  addProducto,
  deleteProducto,
  updateProducto,
} from "../controller/producto";

router.get("/:id?", getProducto);
router.post("/", middlewares.isAdmin, addProducto);
router.put("/:id", middlewares.isAdmin, updateProducto);
router.delete("/:id", middlewares.isAdmin, deleteProducto);

export default router;
