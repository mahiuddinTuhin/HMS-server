/* eslint-disable @typescript-eslint/no-unused-vars */
type CustomErrorProps = {
  statusCode?: number;
};

class AppError extends Error implements CustomErrorProps {
  statusCode?: number;
  error?: Error;

  constructor(message: string, statusCode?: number, error?: Error) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    this.error = error || {
      name: "Unknown error",
      message: "An unexpected unknown error occured",
    };
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
export default AppError;
