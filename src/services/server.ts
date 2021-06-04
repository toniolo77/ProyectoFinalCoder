import express, { Application } from "express";
import { errorHandler } from "../middlewares/error";
import passport from "passport";
import session from "express-session";
import mainRouter from "../routes/index";
const MongoStore = require("connect-mongo");
require('../middlewares/auth');

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Para interpretar los objectos recibidos y que no sean solo cadenas
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL_SESIONS,
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", mainRouter);

app.use(errorHandler);

export default app;
