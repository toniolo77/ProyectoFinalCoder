import fs from "fs";
import { Producto, ProductoModel } from "./producto";

export interface Carrito {
  id: number;
  timestampt: number;
  productos: Producto[];
}

const CARRITOSTORAGE = "carritos.txt";

export class CarritoModel {
  constructor() {}

  private getNewId = async (): Promise<number> => {
    const carritos = await this.getCarritos();
    return carritos.length;
  };

  private createFile = async () => {
    await fs.promises.writeFile(CARRITOSTORAGE, "[]");
  };

  private guardarCarrito = async (carrito): Promise<Carrito[]> => {
    let carritos = await this.getCarritos();
    const indexCarrito = carritos.findIndex((ca) => ca.id === carrito.id);
    (indexCarrito > -1) ? (carritos[indexCarrito] = carrito) : carritos.push(carrito);
    await fs.promises.writeFile(CARRITOSTORAGE, JSON.stringify(carritos));
    return carritos;
  };

  createCarrito = async (): Promise<Carrito> => {
    const carrito: Carrito = {
      id: await this.getNewId(),
      timestampt: Date.now(),
      productos: [],
    };
    await this.guardarCarrito(carrito);
    return carrito;
  };

  getCarrito = async (id?: number): Promise<Carrito | undefined> => {
    if (!fs.existsSync(CARRITOSTORAGE)) {
      await this.createFile();
      return;
    }

    const lectura = await fs.promises.readFile(CARRITOSTORAGE, "utf-8");
    const carritos = JSON.parse(lectura);

    return carritos.find((carrito) => carrito.id === id);
  };

  getCarritos = async (): Promise<Carrito[]> => {
    if (!fs.existsSync(CARRITOSTORAGE)) {
      await this.createFile();
      return [];
    }

    const lectura = await fs.promises.readFile(CARRITOSTORAGE, "utf-8");
    const carritos = JSON.parse(lectura);

    return carritos;
  };

  getProductosCarrito = async (id: number): Promise<Producto[] | undefined> => {
    const carrito = await this.getCarrito(id);
    return carrito?.productos ?? undefined;
  };

  addProducto = async (id_carrito: number, id_producto: number) : Promise<Carrito | undefined>=> {
    const prod = new ProductoModel();
    const producto = await prod.getProducto(id_producto);
    const carrito = await this.getCarrito(id_carrito);
    if (!producto || !carrito) return;

    carrito.productos.push(producto);
    await this.guardarCarrito(carrito);
    return carrito;
  };

  deleteProducto = async (id_carrito: number, id_producto: number) : Promise<Carrito | undefined>=> {
    const prod = new ProductoModel();
    let carrito = await this.getCarrito(id_carrito);
    if (!carrito) return;

    carrito.productos = carrito.productos.filter(p => p.id !== id_producto);
    await this.guardarCarrito(carrito);
    return carrito;
  }
}
