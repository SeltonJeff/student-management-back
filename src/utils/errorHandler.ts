import { Response } from "express";

export type TCustomErrorData = {
  code: string;
  message: string;
  status: number;
};

export const isError = (data: any | TCustomErrorData) => {
  return data.status && data.code && data.message;
};

export default (res: Response, data: TCustomErrorData) => {
  if (data.code && data.status && data.message)
    res.status(data.status).json(data);
  else res.status(200).json(data);
};
