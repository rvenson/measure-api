import MeasureType from "../models/measureType.enum";

interface Measure {
  measure_uuid: string;
  measure_datetime: string;
  measure_type: MeasureType;
  customer_code: string;
  measure_value: number;
  has_confirmed: boolean;
  image_url: string;
}

export default Measure;