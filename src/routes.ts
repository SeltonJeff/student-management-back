import { Router } from "express";

import studentRoutes from "./routes/studentRoutes";
import { authClient } from "./middlewares/auth";

class RootRoutes {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this.setAppRoutes();

    this.routes.get("/", (req, res) =>
      res.status(200).json({ message: "Hello project!" })
    );
  }

  private setAppRoutes() {
    this.routes.use("/student", authClient, studentRoutes);
  }
}

export default new RootRoutes().routes;
