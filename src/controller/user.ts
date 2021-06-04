import { sendResponse } from "./../utils/responses";
import { UserModel as User } from "./../model/user";
import { CarritoModel as Carrito } from "../model/carrito";
import bCrypt from "bcryptjs";
import Logger from "../loggin/loggin";
import { Mail } from "../services/mail";

const MailSender = new Mail();

export const logout = async (req, res) => {
  const { email } = req.user;
  req.logout();
  sendResponse(res, "", `Se usuario: ${email} se ha deslogueado correctamente`);
};

const validatePassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

export const login = (req, email, password, cb) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) return cb(err);
    if (!user) {
      Logger.info(`User Not Found with email ${email}`);
      return cb(null, false);
    }
    if (!validatePassword(user, password)) {
      Logger.info("Invalid Password");
      return cb(null, false);
    }
    return cb(null, user);
  });
};

const sendRegistrationMail = (...params) => {
  let message = "";
  Object.entries(params[0]).forEach(([key, value]) => {
    message += `${key}: ${value} <br/>`;
  });
  Logger.info(message);
  MailSender.sendMail("Nuevo registro", message);
};

export const register =  (req, email, password, cb) => {
  const { name, address, age, phone, profile } = req.body;
  const findOrCreateUser = function () {
    User.findOne({ email: email }, async function (err, user) {
      if (err) {
        Logger.info("Error in SignUp: " + err);
        return cb(err);
      }
      if (user) {
        Logger.info("User already exists");
        return cb(null, false);
      } else {
        const newUserObject = {
          email: email,
          password: createHash(password),
          name,
          address,
          age,
          phone,
          profile,
          carrito: await new Carrito().save()
        };
        var newUser = new User(newUserObject);
        newUser.save((err) => {
          if (err) {
            Logger.error("Error in Saving user: " + err);
            throw err;
          }
          sendRegistrationMail({ email, name, address, age, phone, profile });
          Logger.info("User Registration succesful");
          return cb(null, newUser);
        });
      }
    });
  };
  process.nextTick(findOrCreateUser);
};
