import { Router } from "express";
import Controller from "./controller";
import StudentController from "./controller";

class StudentRoutes {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this.declareRoutes();
  }

  private declareRoutes() {
    this.routes.get("/", Controller.listStudents);
    this.routes.post("/", StudentController.newStudent);
    this.routes.put("/:ra", StudentController.editStudent);
    this.routes.delete("/:ra", StudentController.deleteStudent);
  }
}

export default new StudentRoutes().routes;
