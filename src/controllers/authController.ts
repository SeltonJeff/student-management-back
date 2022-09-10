import { Request, Response } from "express";
import authServices from "../services/authServices";
import { TLogin } from "../entities/userEntity";
import errorHandler, { isError, TCustomErrorData } from "../utils/errorHandler";

class AuthController {
  static async login(req: Request, res: Response) {
    const user: TLogin = req.body;
    const result = await authServices.login(user);
    if (!isError(result)) res.status(200).json(result);
    else errorHandler(res, result as TCustomErrorData);
  }
  static refreshToken(req: Request, res: Response) {
    res.status(200).json({ status: 200, message: "refresh token" });
  }
  static logout(req: Request, res: Response) {
    res.status(200).json({ status: 200, message: "logout" });
  }
}

export default AuthController;
