import { Router } from "express";

import studentRoutes from "./routes/studentRoutes";

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
    this.routes.use("/student", studentRoutes);
  }
}

export default new RootRoutes().routes;
