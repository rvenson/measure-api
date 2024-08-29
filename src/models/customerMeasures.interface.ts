import Measure from "./measure.interface";

interface CustomerMeasures {
  customer_code: string,
  measures: Measure[];
}

export default CustomerMeasures;