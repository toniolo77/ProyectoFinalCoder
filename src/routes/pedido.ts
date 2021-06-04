import express from "express";
import { middlewares } from "../middlewares/permisos";
const router = express.Router();
import { generarPedido } from "./../controller/pedido";

router.post("/", middlewares.isLogin, generarPedido);

export default router;
