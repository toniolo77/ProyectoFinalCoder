import fs from "fs";

export interface Producto {
  id: number;
  timestampt: number;
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: boolean;
}

const PRODUCTOSTORAGE = "productos.txt";

export class ProductoModel {
  constructor() {}

  private createFile = async (productos?: Producto[]) => {
    await fs.promises.writeFile(
      PRODUCTOSTORAGE,
      productos ? JSON.stringify(productos) : "[]"
    );
  };

  private getNewId = async (): Promise<number> => {
    const productos = await this.getProductos();
    return productos.length;
  };

  getProducto = async (id: number): Promise<Producto | undefined> => {
    const productos = await this.getProductos();

    return productos.find((producto) => producto.id === id);
  };

  getProductos = async (): Promise<Producto[]> => {
    if (!fs.existsSync(PRODUCTOSTORAGE)) {
      await this.createFile();
      return [];
    }

    const lectura = await fs.promises.readFile(PRODUCTOSTORAGE, "utf-8");
    const productos = JSON.parse(lectura);

    return productos;
  };

  deleteProducto = async (id: number) : Promise<Producto | undefined>=>  {
    const prod = await this.getProducto(id);
    if (!prod) return;
    const productos = await this.getProductos();
    const newProductos = productos.filter((producto) => producto.id !== id);
    await this.createFile(newProductos);
    return prod;
    
  };

  addProducto = async (
    nombre: string,
    descripcion: string,
    codigo: string,
    foto: string,
    precio: number,
    stock: boolean
  ): Promise<Producto> => {
    const newProducto = {
      id: await this.getNewId(),
      timestampt: Date.now(),
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    };

    const productos = await this.getProductos();
    productos.push(newProducto);
    this.createFile(productos);
    return newProducto;
  };

  updateProducto = async (
    id: number,
    nombre: string,
    descripcion: string,
    codigo: string,
    foto: string,
    precio: number,
    stock: boolean
  ): Promise<Producto | undefined> => {
    const producto = await this.getProducto(id);
    if (!producto) return;

    let newProducto = {
      id,
      timestampt: Date.now(),
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    };

    newProducto = Object.assign(producto,newProducto);
    let productos = await this.getProductos();
    productos[productos.findIndex( prod => prod.id === id)] =newProducto;
    await this.createFile(productos);

    return newProducto;
  };
}
