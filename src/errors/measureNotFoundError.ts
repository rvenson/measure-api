import CustomError from "./customError";

class MeasureNotFoundError extends CustomError {
    constructor(message: string = "Leitura não encontrada") {
        super();
        this.name = "MEASURE_NOT_FOUND";
        this.message = message;
        this.statusCode = 404;
    }
}

export default MeasureNotFoundError;