class ApiError extends Error {
  statusCode: number;
  errors: string[];

  constructor(message: string, status: number) {
    super(message);
    this.statusCode = status;
    this.errors = [];
  }
}

export default ApiError;
