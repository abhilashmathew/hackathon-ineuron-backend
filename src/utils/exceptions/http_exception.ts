class HttpException extends Error {
  public statusCode: number;
  public message: string;
  public caughtError?: unknown;

  constructor(statusCode: number, message: string, caughtError?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.caughtError = caughtError;
  }
}

export = HttpException;
