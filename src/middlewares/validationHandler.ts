import { Request, Response, NextFunction } from "express";
import { validationResult, Result } from "express-validator";
import InvalidDataError from "../errors/invalidDataError";

export default (request : Request, response : Response, next : NextFunction) => {
  const result : Result = validationResult(request);
  if (!result.isEmpty()) throw new InvalidDataError(result.array().at(0)?.msg);
  next();
}
