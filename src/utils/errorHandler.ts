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

const knowErrors = {
  // client
  ERR_INVALID_CLIENT: 401,

  // user
  ERR_USER_NOT_FOUND: 404,
  ERR_INCORRECT_USER_DATA: 401,
  ERR_USER_NOT_AUTHORIZED: 401,

  // student
  ERR_STUDENT_LISTING: 500,
  ERR_STUDENT_NOT_FOUND: 404,
  ERR_DOCUMENT_ALREADY_IN_USE: 409,
  ERR_RA_ALREADY_IN_USE: 409,
};
