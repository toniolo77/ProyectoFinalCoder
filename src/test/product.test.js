const expect = require("chai").expect;
const request = require("supertest")("http://localhost:9005");

describe("text api restfull", () => {
  describe("Obtener productos", () => {
    let productos;
    it("Obtener todos los productos", async () => {
      const response = await request.get("/producto");
      expect(response.status).to.eql(200);
      productos = response.body;
    });

    it("Obtener un producto", async () => {
      if (productos?.length > 0) {
        const response = await request.get(`/producto/${productos[0]._id}`);
        expect(response.status).to.eql(200);
        const newProduct = response.body;
        expect(newProduct.nombre).to.eql(productos[0].nombre);
        expect(newProduct._id).to.eql(productos[0]._id);
      }
    });
  });

  describe("Agregar  y eliminar un producto", () => {
    let addedProduct;
    it("Agregar un nuevo producto", async () => {
      const newProduct = {
        nombre: "Notebook",
        descripcion: "Apple",
        codigo: "apple123",
        foto: "imagen",
        precio: 230000,
        stock: 1,
      };

      const response = await request.post("/producto").send(newProduct);
      expect(response.status).to.eql(200);
      addedProduct = response.body;

      expect(addedProduct.nombre).to.eql(newProduct.nombre);
      expect(addedProduct.descripcion).to.eql(newProduct.descripcion);
      expect(addedProduct.codigo).to.eql(newProduct.codigo);
      expect(addedProduct.foto).to.eql(newProduct.foto);
      expect(addedProduct.precio).to.eql(newProduct.precio);
      expect(addedProduct.stock).to.eql(newProduct.stock);
    });

    it("Verificar insercion", async () => {
      const response = await request.get(`/producto/${addedProduct._id}`);
      expect(response.status).to.eql(200);

      expect(addedProduct._id).to.eql(response.body._id);
    });

    it("Verificar modificacion", async () => {
      const updatedProduct = {
        nombre: "Tv samsung",
        descripcion: "Nueva actualizacion",
        codigo: "TV",
        foto: "imagen2",
        precio: 2523232,
        stock: 12,
      };
      const response = await request.put(`/producto/${addedProduct._id}`).send(updatedProduct);
      expect(response.status).to.eql(200);

      const productResponse = response.body;
      expect(updatedProduct.descripcion).to.eql(productResponse.descripcion);
      expect(updatedProduct.codigo).to.eql(productResponse.codigo);
      expect(updatedProduct.foto).to.eql(productResponse.foto);
      expect(updatedProduct.precio).to.eql(productResponse.precio);
      expect(updatedProduct.stock).to.eql(productResponse.stock);

    });

    it("Eliminar producto", async () => {
      const response = await request.delete(`/producto/${addedProduct._id}`);
      expect(response.status).to.eql(200);
    });

    it("Verificar eliminacion producto", async () => {
      const response = await request.get(`/producto/${addedProduct._id}`);
      expect(response.body).to.eql({});
    });
  });
});
