import mongoose from "mongoose";
import Logger from "../loggin/loggin";
mongoose.Promise = global.Promise;
let isConnected;

const dbSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

export const connectToDatabase = () => {
  if (isConnected) {
    Logger.info("using existing database connection");
    return Promise.resolve();
  }
  const uri = process.env.MONGO_DB || "";
  return mongoose.connect(uri, dbSettings).then((db) => {
    isConnected = db.connections[0].readyState;
  });
};
