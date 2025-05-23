import { HTTP_STATUS } from "../../constants/enums/http/http.enum";

export class CustomValidationError extends Error {
  public status: number;
  public errors: unknown;

  constructor(errors?: unknown, status = HTTP_STATUS.BAD_REQUEST) {
    super();
    this.name = "ValidationError";
    this.status = status;
    this.errors = errors;
  }
}
