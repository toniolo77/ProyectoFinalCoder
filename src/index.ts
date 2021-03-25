import express, { Application } from "express";
import mongoose from "mongoose";
import http from "http";
import productoRoutes from "./routes/producto";
import carritoRoutes from "./routes/carrito";

const app: Application = express();
const http_server = new http.Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Para interpretar los objectos recibidos y que no sean solo cadenas

// const PORT = process.env.PORT ;
const PORT = 8080;

const server = http_server
  .listen(PORT, () => {
    mongoose
      .connect("mongodb://127.0.0.1/ecommerce", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then((c) => console.log("Conexion Correcta")).catch(err => console.log("ERRRRROR"));
  })
  .on("error", (error) =>
    console.log(`Se produjo un error al iniciar el servidor ${error}`)
  );

//Cargar rutas
app.use("/producto", productoRoutes);
app.use("/carrito", carritoRoutes);
app.use((req, res, next) => {
  console.log(req);
  res.status(404).send({
    error: -2,
    descripcion: `ruta ${req.originalUrl} no implementada`,
  });
});
