import { Producto } from "./../model/producto";
import { sendResponse } from "./../utils/responses";
import { UserModel as User } from "./../model/user";
import { CarritoModel } from "../model/carrito";
import { Request, Response } from "express";
import { Mail } from "../services/mail";
import { sendSms, sendWhatsapp } from "../services/sms";

const MailSender = new Mail();

const sendPedidoMail = (user, productos: Producto[]) => {
  let message = "";
  productos.forEach((producto) => {
    message += `Producto: ${producto.nombre} </br>`;
  });

  MailSender.sendMail(
    `Nuevo pedido de ${user.name}, email: ${user.email}`,
    message
  );
  sendSms(user.phone, "Su pedido ha sido recibido y se encuentra en proceso");
  sendWhatsapp(message);
};

export const generarPedido = async (req, res: Response, next) => {
  try {
    const productos = await CarritoModel.findById(req.user.carrito).populate(
      "productos"
    );

    if (!productos.productos.length) {
      return sendResponse(
        res,
        "",
        "No se puede generar un pedido sin seleccionar productos"
      );
    }

    const user = await User.findById(req.user._id);
    user.carrito = await new CarritoModel().save();
    await user.save();

    sendPedidoMail(user, productos.productos);

    sendResponse(res, "", "Se genero el pedido correctamente");
  } catch (err) {
    next(err);
  }
};
