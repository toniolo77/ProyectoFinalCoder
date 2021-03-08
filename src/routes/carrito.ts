import express from "express";
const router = express.Router();
import {
    getProductosCarrito,
    addProductoCarrito,
    deleteProducto,
} from '../controller/carrito';

router.get("/:id_carrito", getProductosCarrito);
router.post("/:id_carrito?", addProductoCarrito);
router.delete("/:id_carrito", deleteProducto);

export default router;