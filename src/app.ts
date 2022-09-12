import express, { Application } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import AppRoutes from "./routes";
import swaggerRoutes from "./swaggerRoutes";

class App {
  public application: Application;

  constructor() {
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
}

export default new App().application;
