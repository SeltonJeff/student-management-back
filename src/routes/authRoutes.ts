import { Router } from "express";
import authController from "../controllers/authController";

class AuthRoutes {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this.declareRoutes();
  }

  private declareRoutes() {
    this.routes.post("/login", authController.login);
    this.routes.get("/refresh-token", authController.refreshToken);
    this.routes.get("/logout", authController.logout);
  }
}

export default new AuthRoutes().routes;
