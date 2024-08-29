import CustomError from "./customError";

class DoubleReportError extends CustomError {
    constructor(message: string = "Leitura do mês já realizada") {
        super();
        this.name = "DOUBLE_REPORT";
        this.message = message;
        this.statusCode = 409;
    }
}

export default DoubleReportError;