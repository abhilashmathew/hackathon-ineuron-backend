class HttpException extends Error {
  public statusCode: number;
  public message: string;
  public routeInfo?: Record<string, unknown>;
  public caughtError?: unknown;

  constructor(
    statusCode: number,
    message: string,
    caughtError?: unknown,
    routeInfo?: Record<string, unknown>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.caughtError = caughtError;
    this.routeInfo = routeInfo;
  }
}

export = HttpException;
