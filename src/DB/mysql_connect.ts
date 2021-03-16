export const mysql_connect = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "123123",
    database: "ecommerce",
  },
};

export const createTables = async (knex) => {
  try {
    const existProductos = await knex.schema.hasTable("productos");
    if (!existProductos) {
      await knex.schema.createTable("productos", function (t) {
        t.increments("id").primary().notNullable();
        t.timestamp("timestampt");
        t.string("nombre", 100).notNullable();
        t.string("descripcion", 255).notNullable();
        t.string("codigo", 50).notNullable();
        t.string("foto", 255).notNullable();
        t.decimal("precio", 8, 2).notNullable();
        t.boolean("stock").notNullable();
      });
    }
    
    const existCarritos = await knex.schema.hasTable("carritos");
    if (!existCarritos) {
      await knex.schema.createTable("carritos", function (t) {
        t.increments("id").primary().notNullable();
        t.timestamp("timestampt");
      });
    }

    const existCarritoProducto = await knex.schema.hasTable("carrito_producto");
    if (!existCarritoProducto) {
      await knex.schema.createTable("carrito_producto", function (t) {
        t.increments("id").primary().notNullable();
        t.integer("id_carrito")
          .notNullable()
          .unsigned()
          .references("carritos.id")
          .onDelete("CASCADE");
        t.integer("id_producto")
          .notNullable()
          .unsigned()
          .references("productos.id")
          .onDelete("CASCADE");
      });
    }
  } 
  catch(e) {
    console.log(e);
  }
  finally {
    knex.destroy();
  }
};
