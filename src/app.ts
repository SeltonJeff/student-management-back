import express, { Application } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import AppRoutes from "./routes";
import dataSource from "./dataSource";
import authServices from "./services/authServices";
import swaggerRoutes from "./swaggerRoutes";

class App {
  public application: Application;

  constructor() {
    this.useDatabase();
    this.application = express();
    this.useMiddlewares();
  }

  private async useMiddlewares() {
    this.application.use(bodyParser.json());
    this.application.use(bodyParser.urlencoded({ extended: false }));
    this.application.use(cors());
    this.application.use(AppRoutes);
    this.application.use(await swaggerRoutes.load());
  }

  private useDatabase() {
    dataSource
      .initialize()
      .then(() => {
        console.log("db initialized.");
        authServices.registerAminUser();
      })
      .catch((error) => console.log("db init failed.", error));
  }
}

export default new App().application;
