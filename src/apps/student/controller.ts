import { Request, Response } from "express";

class StudentController {
  static listStudents(req: Request, res: Response) {
    res.status(200).json({ message: "List of students here!" });
  }

  static newStudent(req: Request, res: Response) {
    res.status(201).json({ message: "New student has ben added!" });
  }

  static editStudent(req: Request, res: Response) {
    res.status(200).json({ message: "Edit student!" });
  }

  static deleteStudent(req: Request, res: Response) {
    res.status(200).json({ message: "Student has ben deleted!" });
  }
}

export default StudentController;
