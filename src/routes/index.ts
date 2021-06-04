import express from "express";
import productoRoutes from "./producto";
import carritoRoutes from "./carrito";
import pedidoRoutes from "./pedido";
import userRoutes from "./user"
const router = express.Router();


router.use("/user", userRoutes);
router.use("/producto", productoRoutes);
router.use("/carrito", carritoRoutes);
router.use("/pedido", pedidoRoutes);


router.use((req, res, next) => {
  res.status(404).send({
    error: -2,
    descripcion: `ruta ${req.originalUrl} no implementada`,
  });
});

export default router;
