import express, { Application } from "express";
import http from "http";
import productoRoutes from './routes/producto';
import carritoRoutes from './routes/carrito';
import { mysql_connect, createTables } from './DB/mysql_connect';

const app: Application = express();
const http_server = new http.Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Para interpretar los objectos recibidos y que no sean solo cadenas

// const PORT = process.env.PORT ;
const PORT = 8080 ;


const server = http_server
.listen(PORT, () => {
  console.log("Se inicio el servidor correctamente");
})
.on("error", (error) =>
console.log(`Se produjo un error al iniciar el servidor ${error}`)
);

//Connect to DB
const knex =  require('knex')(mysql_connect);
//Create Tables
createTables(knex);

//Cargar rutas
app.use("/producto", productoRoutes);
app.use("/carrito", carritoRoutes);
app.use((req, res, next) => {
  console.log(req);
  res.status(404).send({error: -2, descripcion: `ruta ${req.originalUrl} no implementada`});
});
