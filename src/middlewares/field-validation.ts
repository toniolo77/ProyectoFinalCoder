import { getErrorMsg } from './../utils/common';
import { sendErrorResponse, ResponseType } from './../utils/responses';
import { validationResult }  from 'express-validator';

const fieldsValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendErrorResponse(res,ResponseType.BAD_REQUEST,getErrorMsg(errors));
  }
  next();
};

export default fieldsValidation
