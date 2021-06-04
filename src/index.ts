require("dotenv").config();
import { connectToDatabase } from "./services/db";
import Logger from "./loggin/loggin";
import app from "./services/server";
import cluster from "cluster";
const numCPUs = require("os").cpus().length;

const PORT = process.env.PORT || 9005;
let MODE = "FORK";

connectToDatabase().then(() => {
  if (MODE === "CLUSTER") {
    if (cluster.isMaster) {
      Logger.info(`Master ${process.pid} is running`);

      //For workers
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker, code, signal) => {
        Logger.info(`worker ${worker.process.pid} died`);
      });
    } else {
      connectToDatabase().then(() => {
        app
          .listen(PORT, () => {
            Logger.info("Server started.");
          })
          .on("error", (error) => Logger.error(error));
      });
    }
  } else {
    Logger.info("Mode fork");
    connectToDatabase().then(() => {
      app
        .listen(PORT, () => {
          Logger.info("Server started.");
        })
        .on("error", (error) => Logger.error(error));
    });
  }
});
