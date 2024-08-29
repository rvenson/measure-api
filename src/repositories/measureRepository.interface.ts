import CustomerMeasures from '../models/customerMeasures.interface';
import Measure from '../models/measure.interface';

interface MeasureRepository {
  add(measure: Measure, customerCode: string): Promise<Measure>;
  getById(measureId: string): Promise<Measure>;
  getByCustomerCode(customerCode: string): Promise<CustomerMeasures>;
  getByCustomerCodeAndMonthAndType(customerCode: string, date: string, type: string): Promise<CustomerMeasures>
  update(measure: Measure): Promise<Measure>;
}

export default MeasureRepository