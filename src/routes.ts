import { Router } from "express";

class RootRoutes {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this.setAppRoutes();
  }

  private setAppRoutes() {
    this.routes.get("/", (req, res) =>
      res.status(200).json({ message: "Hello project!" })
    );
  }
}

export default new RootRoutes().routes;
