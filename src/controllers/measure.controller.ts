import { Request, Response, RequestHandler, NextFunction } from "express";
import MeasureService from "../services/measure.service";
import Measure from "../models/measure.interface";
import CustomerMeasures from "../models/customerMeasures.interface";

class MeasureController {
  constructor(private measureService: MeasureService) {}

  public upload: RequestHandler = async (request: Request, response: Response, next : NextFunction) => {
    try {
      const measure : Measure = await this.measureService.upload(request.body);
      response.status(201).send(measure);
    } catch (error : any) {
      next(error);
    }
  }

  public confirm: RequestHandler = async (request: Request, response: Response, next : NextFunction) => {
    try {
      const confirmation = await this.measureService.confirm(request.body);
      response.status(200).send(confirmation);
    } catch (error : any) {
      next(error);
    }
  }

  public list: RequestHandler = async (request: Request, response: Response, next : NextFunction) => {
    try {
      const customerMeasures : CustomerMeasures = await this.measureService.list(request.params.customerCode);
      response.status(200).send(customerMeasures);
    } catch (error : any) {
      next(error);
    }
  }
}

export default MeasureController;