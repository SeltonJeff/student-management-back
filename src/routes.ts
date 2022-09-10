import { Router } from "express";
import { authClient, authUser } from "./middlewares/auth";

import studentRoutes from "./routes/studentRoutes";
import authRoutes from "./routes/authRoutes";

class RootRoutes {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this.setAppRoutes();
  }

  private setAppRoutes() {
    this.routes.use("/auth", authClient, authRoutes);
    this.routes.use("/student", authClient, authUser, studentRoutes);
  }
}

export default new RootRoutes().routes;
