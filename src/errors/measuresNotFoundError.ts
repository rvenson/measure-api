import CustomError from "./customError";

class MeasuresNotFoundError extends CustomError {
    constructor(message: string = "Nenhuma leitura encontrada") {
        super();
        this.name = "MEASURES_NOT_FOUND";
        this.message = message;
        this.statusCode = 404;
    }
}

export default MeasuresNotFoundError;