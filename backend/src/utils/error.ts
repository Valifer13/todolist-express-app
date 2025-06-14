export class HttpError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // Call Error constructor
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    // Set prototype for instanceof
    Object.setPrototypeOf(this, HttpError.prototype);

    // Optional: for stacktrace node.js
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}