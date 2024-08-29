import CustomError from "./customError";

class ConfirmationDuplicateError extends CustomError {
    constructor(message: string = "Leitura do mês já realizada") {
        super();
        this.name = "CONFIRMATION_DUPLICATE";
        this.message = message;
        this.statusCode = 409;
    }
}

export default ConfirmationDuplicateError;