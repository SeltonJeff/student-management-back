import { Request, Response } from "express";
import studentServices from "../services/studentServices";
import { TStudentData } from "../entities/studentEntity";
import errorHandler, { isError, TCustomErrorData } from "../utils/errorHandler";

class StudentController {
  static async listStudents(req: Request, res: Response) {
    const result = await studentServices.listStudent();
    if (!isError(result)) res.status(200).json(result);
    else errorHandler(res, result as TCustomErrorData);
  }

  static async listStudentsByQuery(req: Request, res: Response) {
    const { query } = req.params;
    const result = await studentServices.listStudentsByQuery(query);
    if (!isError(result)) res.status(200).json(result);
    else errorHandler(res, result as TCustomErrorData);
  }

  static async newStudent(req: Request, res: Response) {
    const data: TStudentData = req.body;
    const result: any = await studentServices.newStudent(data);
    if (!isError(result)) res.status(201).json(result);
    else errorHandler(res, result as TCustomErrorData);
  }

  static async editStudent(req: Request, res: Response) {
    const { id } = req.params;
    const data: TStudentData = req.body;
    const { ra: RA, cpf, ...attr } = data;
    const result = await studentServices.editStudent(id, { ...attr });
    if (!isError) res.status(200).json(result);
    else errorHandler(res, result as TCustomErrorData);
  }

  static async deleteStudent(req: Request, res: Response) {
    const { id } = req.params;
    const result = await studentServices.deleteStudent(id);
    if (!isError) res.status(200).json(result);
    else errorHandler(res, result as TCustomErrorData);
  }
}

export default StudentController;
