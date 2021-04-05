import { sendErrorResponse, ResponseType } from './../utils/responses';

export const errorHandler = (err,req,res,next) => {
    console.log(err,res);
    sendErrorResponse(res,ResponseType.INTERNAL_ERROR,'Se produjo un error al intentar realizar la operacion');
} 