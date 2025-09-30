class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.statusCode = status;
    this.errors = [];
  }

  static UserNotFound() {
    return new ApiError("User not found", 404);
  }

  static UserAlreadyExists() {
    return new ApiError("User already exists", 409);
  }

  static InvalidCredentials() {
    return new ApiError("Invalid login or password", 401);
  }

  static TokenNotFound() {
    return new ApiError("Token not found", 404);
  }

  static NotFound() {
    return new ApiError("Not Found", 404);
  }

  static UnauthorizedError() {
    return new ApiError("Unauthorized", 401);
  }

  static BadRequest(message, errors = []) {
    const msg = message || "Bad Request";

    const err = new ApiError(msg, 400);
    err.errors = errors;

    return err;
  }

  static RequiredField(field) {
    return new ApiError(`${field} is required`, 400);
  }
}

export default ApiError;
