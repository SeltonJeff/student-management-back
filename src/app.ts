import express, { Application } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import AppRoutes from "./routes";

class App {
  public application: Application;

  constructor() {
    this.application = express();
    this.useMiddlewares();
  }

  private useMiddlewares() {
    this.application.use(bodyParser.json());
    this.application.use(bodyParser.urlencoded({ extended: false }));
    this.application.use(cors());
    this.application.use(AppRoutes);
  }
}

export default new App().application;
