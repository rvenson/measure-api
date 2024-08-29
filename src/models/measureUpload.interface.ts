import MeasureType from "./measureType.enum";

interface MeasureUpload {
    image: string;
    customer_code: string;
    measure_datetime: string;
    measure_type: MeasureType;
}

export default MeasureUpload;