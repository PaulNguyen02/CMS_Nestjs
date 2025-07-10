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

  static duplicateData(): ApiResponse<null> {
    return ApiResponse.error({ code: HttpStatus.BAD_REQUEST, message: 'Dữ liệu đã tồn tại (duplicate key)' });
  }

  static unauthorized(message?: string): ApiResponse<null> {
    return ApiResponse.error({ code: HttpStatus.UNAUTHORIZED, message: message ?? 'Unauthorized' });
  }

  static notFound(message?: string): ApiResponse<null> {
    return ApiResponse.error({ code: HttpStatus.NOT_FOUND, message: message ?? 'Resource not found' });
  }

  static internalError(message?: string): ApiResponse<null> {
    return ApiResponse.error({ code: HttpStatus.INTERNAL_SERVER_ERROR, message: message ?? 'Internal server error' });
  }

  static validationError(errors: { error: string }[]): ApiResponse<any> {
    return new ApiResponse(HttpStatus.BAD_REQUEST, ResponseCode.VALIDATION_ERROR, errors);
  }
}