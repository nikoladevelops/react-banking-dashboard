export class AppError extends Error {
  public statusCode: number;
  public errorKey: string;

  constructor(message: string, statusCode: number, errorKey: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorKey = errorKey;
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, errorKey: string) {
    super(message, 404, errorKey);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, errorKey: string) {
    super(message, 409, errorKey);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, errorKey: string) {
    super(message, 400, errorKey);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string, errorKey: string) {
    super(message, 401, errorKey);
  }
}
