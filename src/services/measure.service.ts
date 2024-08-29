import MeasureRepository from "../repositories/measureRepositoryImpl";
import MeasureUpload from "../models/measureUpload.interface";
import MeasureConfirm from "../models/measureConfirm.interface";
import Measure from "../models/measure.interface";
import CustomerMeasures from "../models/customerMeasures.interface";
import { randomUUID } from "crypto";
import MeasureNotFoundError from "../errors/measureNotFoundError";
import MeasuresNotFoundError from "../errors/measuresNotFoundError";
import DoubleReportError from "../errors/doubleReportError";
import ConfirmationDuplicateError from "../errors/confirmationDuplicateError";
import AiService from "./aiServiceImpl.service";

class MeasureService {  
  constructor(private measureRepository: MeasureRepository, private aiService: AiService) {}

  public async upload(measureUpload: MeasureUpload): Promise<any> {
    const monthMeasures = await this.measureRepository.getByCustomerCodeAndMonthAndType(
      measureUpload.customer_code,
      measureUpload.measure_datetime,
      measureUpload.measure_type
    );
    if (monthMeasures.measures.length > 0) throw new DoubleReportError();
    const estimated_value = await this.aiService.readImage(measureUpload.image);
    const measure : Measure = {
      measure_uuid: randomUUID(),
      measure_datetime: measureUpload.measure_datetime,
      measure_type: measureUpload.measure_type,
      customer_code: measureUpload.customer_code,
      measure_value: estimated_value,
      has_confirmed: false,
      image_url: measureUpload.image
    }
    await this.measureRepository.add(measure, measureUpload.customer_code);
    return {
      image_url: measureUpload.image,
      measure_value: estimated_value,
      measure_uuid: measure.measure_uuid,
    }
  }

  public async confirm(measureConfirm: MeasureConfirm): Promise<any> {
    const measure = await this.measureRepository.getById(measureConfirm.measure_uuid);
    if (!measure) throw new MeasureNotFoundError();
    if (measure.has_confirmed) throw new ConfirmationDuplicateError();
    measure.has_confirmed = true;
    measure.measure_value = measureConfirm.confirmed_value;
    await this.measureRepository.update(measure);
    return {
      success: true
    }
  }

  public async list(customerCode: string): Promise<CustomerMeasures> {
    const customerMeasures = await this.measureRepository.getByCustomerCode(customerCode);
    if (customerMeasures.measures.length == 0) throw new MeasuresNotFoundError();
    return customerMeasures;
  }
}

export default MeasureService;