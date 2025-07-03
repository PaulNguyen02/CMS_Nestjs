import { ResponseCode } from "@/common/enums/response-code";
import { HttpStatus } from "@nestjs/common";
export class ApiResponse<T> {
  code: number;
  message: string;
  data: T | T[] | null;

  constructor(code: number, message: string, data: T | T[] | null = null) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static success<T>(data: T | T[]): ApiResponse<T> {
    return new ApiResponse(HttpStatus.OK, ResponseCode.SUCCESS, data);
  }

  static error<T = null>(): ApiResponse<T> {
    return new ApiResponse<T>(HttpStatus.INTERNAL_SERVER_ERROR, ResponseCode.SERVER_ERROR, null);
  }
}