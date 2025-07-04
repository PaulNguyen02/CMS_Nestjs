import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from './api-response';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const response: any = exception.getResponse();

    // Xử lý lỗi validation
    if (
      exception instanceof BadRequestException &&
      Array.isArray(response.message)
    ) {
      const errors = response.message.map((msg: string) => {
        const [field, ...rest] = msg.split(' ');
        return {
          field,
          error: msg,
        };
      });

      return res
        .status(status)
        .json(ApiResponse.validationError(errors));
    }

    // Các lỗi HTTP khác
    return res.status(status).json(
      new ApiResponse(
        status,
        response.message || exception.message,
        null,
      ),
    );
  }
}