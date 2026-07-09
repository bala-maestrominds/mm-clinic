// Lightweight custom error so controllers/services can throw something with
// an explicit HTTP status instead of every 404/400 being guessed by the
// generic error handler.
//
// Usage: throw new ApiError(404, 'Doctor not found');
export class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}
