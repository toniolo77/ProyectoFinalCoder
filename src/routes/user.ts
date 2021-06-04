import {
  sendResponse,
  sendErrorResponse,
  ResponseType,
} from "./../utils/responses";
import express from "express";
import passport from "passport";
import { logout } from "../controller/user";
import fieldsValidation from "../middlewares/field-validation";
const router = express.Router();

const { body } = require("express-validator");

router.post(
  "/login",
  [
    body("email").isString(),
    body("password").isString(),
    fieldsValidation,
    passport.authenticate("login", { failureRedirect: "/user/faillogin" }),
  ],
  (req, res) => {
    sendResponse(res, "", "Se ha logueado el usuario correctamente");
  }
);

router.get("/faillogin", (req, res, next) => {
  sendErrorResponse(
    res,
    ResponseType.BAD_REQUEST,
    "Error al intentar logearse"
  );
});

/* --------- REGISTER ---------- */
router.get("/failregister", (req, res) => {
  sendErrorResponse(
    res,
    ResponseType.BAD_REQUEST,
    "Se produjo un error al registrarse"
  );
});

router.post(
  "/register",
  [
    body("email").isString(),
    body("password").isString(),
    body("name").isString(),
    body("address").isString(),
    body("age").isNumeric(),
    body("phone").isString(),
    body("profile").isString(),
    fieldsValidation,
    passport.authenticate("register", {
      failureRedirect: "/user/failregister",
    }),
  ],
  (req, res) => {
    sendResponse(res, "", "Se ha registrado el usuario correctamente");
  }
);

router.get("/logout", logout);

export default router;
