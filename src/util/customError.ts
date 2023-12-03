type CustomErrorProps = {
  statusCode?: number;
};

class AppError extends Error implements CustomErrorProps {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    console.log(message);
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
export default AppError;
