import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/customError";

class ErrorHandler {
  public handleError(err: CustomError, req: Request, res: Response, next: NextFunction): void {
    console.error(err);
    res.status(err.statusCode).json({
      error_code: err.name,
      error_description: err.message,
    });
  }
}

export default ErrorHandler;