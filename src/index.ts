require("dotenv").config();
import { connectToDatabase } from "./services/db";
import Logger from "./loggin/loggin";
import app from './services/server';

const PORT = process.env.PORT || 9005;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    Logger.info("Server started.");
  })
  .on("error", (error) =>
    Logger.error(error)
  );
});

