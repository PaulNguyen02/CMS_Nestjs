import { ResponseCode } from "@/common/enums/response-code";
import { HttpStatus } from "@nestjs/common";
export class ApiResponse<T> {
  code: number;
  message: string;
  response: T | T[] | null;

  constructor(code: number, message: string, response: T | T[] | null = null) {
    this.code = code;
    this.message = message;
    this.response = response;
  }

  static success<T>(response: T | T[]): ApiResponse<T> {
    return new ApiResponse(HttpStatus.OK, ResponseCode.SUCCESS, response);
  }


  static error<T = null>(options?: { code?: number; message?: string }): ApiResponse<T> {
    return new ApiResponse<T>(
      options?.code ?? HttpStatus.INTERNAL_SERVER_ERROR,
      options?.message ?? ResponseCode.SERVER_ERROR,
      null,
    );
  }

  static validationError(errors: { field: string; error: string }[]): ApiResponse<any> {
    return new ApiResponse(HttpStatus.BAD_REQUEST, ResponseCode.VALIDATION_ERROR, errors);
  }
}