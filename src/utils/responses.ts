import { EMPTY_VALUE } from "./common";
import { Response } from "express";

export enum ResponseType {
  OK = 200,
  BAD_REQUEST = 400,
  INTERNAL_ERROR = 500,
}

export enum ResponseStatus {
  VALID = 1,
  ERROR = 2,
}

export const sendResponse = (
  res: Response,
  type: ResponseType,
  value: any,
  msg: string
) => {
  const status =
    type === ResponseType.OK ? ResponseStatus.VALID : ResponseStatus.ERROR;
  res.status(type).json({ status, value, msg });
};

export const sendErrorResponse = (
  res: Response,
  type: ResponseType,
  msg: string
) => {
  const status = ResponseStatus.ERROR;
  res.status(type).json({ status, value: EMPTY_VALUE, msg });
};
