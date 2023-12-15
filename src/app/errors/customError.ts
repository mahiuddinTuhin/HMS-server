/* eslint-disable @typescript-eslint/no-unused-vars */
type CustomErrorProps = {
  statusCode?: number;
};

//
class AppError extends Error {
  // class AppError extends Error implements CustomErrorProps {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    this.message = message || "An unexpected unknown error occured";

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
export default AppError;
