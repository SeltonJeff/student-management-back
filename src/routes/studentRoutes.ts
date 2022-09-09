import { Router } from "express";
import studentController from "../controllers/studentController";

class StudentRoutes {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this.declareRoutes();
  }

  private declareRoutes() {
    this.routes.get("/", studentController.listStudents);
    this.routes.get("/:query", studentController.listStudentsByQuery);
    this.routes.post("/", studentController.newStudent);
    this.routes.patch("/:ra", studentController.editStudent);
    this.routes.delete("/:ra", studentController.deleteStudent);
  }
}

export default new StudentRoutes().routes;
