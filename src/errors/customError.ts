class CustomError extends Error {
  public statusCode: number;

  constructor(message: string = "Error occurred") {
      super();
      this.name = "CUSTOM_ERROR";
      this.message = message;
      this.statusCode = 500;
  }
}

export default CustomError;