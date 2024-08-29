import CustomError from "./customError";

class InvalidDataError extends CustomError {
    constructor(message: string = "Invalid data") {
        super();"Erro"
        this.name = "INVALID_DATA";
        this.message = message;
        this.statusCode = 400;
    }
}

export default InvalidDataError;