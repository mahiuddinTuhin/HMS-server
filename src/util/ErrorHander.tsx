class ErrorHandler extends Error {
  StatusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: any, StatusCode: number) {
    super(message);
    this.StatusCode = StatusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
