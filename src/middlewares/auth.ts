import { Request, Response, NextFunction } from "express";
import Env from "../env";

export const authClient = (req: Request, res: Response, next: NextFunction) => {
  const { secret } = req.headers;
  if (!secret || secret !== Env.APP_SECRET) {
    return res
      .status(401)
      .json({ code: "401.001", status: 401, message: "Invalid client." });
  }
  next();
};
