import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Env from "../env";

export const authClient = (req: Request, res: Response, next: NextFunction) => {
  const { client_secret } = req.headers;
  if (!client_secret || client_secret !== Env.APP_CLIENT_SECRET) {
    return res.status(401).json({
      code: "ERR_INVALID_CLIENT",
      status: 401,
      message: "Client inválido.",
    });
  }
  next();
};

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  const { access_token } = req.headers;
  if (!access_token) {
    return res.status(401).json({
      code: "ERR_USER_NOT_AUTHORIZED",
      status: 401,
      message: "Usuário não autorizado.",
    });
  }
  jwt.verify(String(access_token), Env.APP_TOKEN_SECRET, (err, decodedJwt) => {
    if (err) {
      return res.status(401).json({
        code: "ERR_USER_NOT_AUTHORIZED",
        status: 401,
        message: "Usuário não autorizado.",
      });
    }
    // @ts-ignore
    req.decodedJwt = decodedJwt;
    next();
  });
};
