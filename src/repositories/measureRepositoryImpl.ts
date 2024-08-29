import MeasureRepository from './measureRepository.interface';
import Measure from '../models/measure.interface';
import CustomerMeasures from '../models/customerMeasures.interface';

type Data = {
  measures: Measure[];
}

class MeasureRepositoryImpl implements MeasureRepository {
  private db : Data = { measures: []};

  async add(measure: Measure, customerCode: string): Promise<Measure> {
    this.db.measures.push(measure);
    return measure;
  }

  async getById(measureId: string): Promise<Measure> {
    return this.db.measures.find(measure => measure.measure_uuid === measureId) as Measure;
  }

  async getByCustomerCode(customerCode: string): Promise<CustomerMeasures> {
    const measures = this.db.measures.filter(measure => measure.customer_code === customerCode);
    return {
      customer_code: customerCode,
      measures: measures
    };
  }

  async getByCustomerCodeAndMonthAndType(customerCode: string, date: string, type: string): Promise<CustomerMeasures> {
    const searchDate = new Date(date);
    const customerMeasuresFromType = this.db.measures.filter(measure => measure.customer_code === customerCode && measure.measure_type === type);
    const monthMeasures = customerMeasuresFromType.filter(measure => {
      const measureDate = new Date(measure.measure_datetime);
      return measureDate.getMonth() === searchDate.getMonth() && measureDate.getFullYear() === searchDate.getFullYear();
    });
    return {
      customer_code: customerCode,
      measures: monthMeasures
    };
  }

  async update(measure: Measure): Promise<Measure> {
    const index = this.db.measures.findIndex(m => m.measure_uuid === measure.measure_uuid);
    this.db.measures[index] = measure;
    return measure;
  }
}

export default MeasureRepositoryImpl;