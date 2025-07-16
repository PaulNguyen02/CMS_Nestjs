import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ApiResponse } from './api-response';
import { ERROR_MESSAGES_MAP } from '../const/validate-error-list.const';
@Catch() //Nếu có tham số nó chỉ bắt 1 lỗi xác định
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    // Trường hợp lỗi HTTP (BadRequestException, NotFoundException, v.v.)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response: any = exception.getResponse();

      // Lỗi validation
      if (
        exception instanceof BadRequestException &&
        Array.isArray(response.message)
      ) {
        const errors = response.message.map((msg: string) => {
          const [field, ...rest] = msg.split(' ');
          const rawMessage = rest.join(' ');
          const translated = ERROR_MESSAGES_MAP[rawMessage] || rawMessage;
          return {
            field,
            error: `${field} ${translated}`,
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
          response?.message || exception.message,
          null,
        ),
      );
    }

    if (exception instanceof QueryFailedError) {
      const err: any = exception;
      const num = err.driverError?.number as number;

      // Duplicate violations: PK (2627) hoặc UNIQUE INDEX (2601)
      if (num === 2627 || num === 2601) {
        return res
          .status(400)
          .json(ApiResponse.error({
            code: 400,
            message: 'Dữ liệu đã tồn tại (duplicate key violation).',
          }));
      }

      // FK hoặc constraint violation (SQL Server mã 547)
      if (num === 547) {
        return res
          .status(400)
          .json(ApiResponse.error({
            code: 400,
            message: 'Vi phạm ràng buộc – khóa ngoại hoặc constraint không thỏa mãn.',
          }));
      }

      // Các lỗi SQL khác
      return res
        .status(500)
        .json(ApiResponse.error({
          code: 500,
          message: 'Lỗi cơ sở dữ liệu.',
        }));
    }

    if (exception instanceof UnauthorizedException) {
      return res.status(401).json(ApiResponse.unauthorized());
    }

    if (exception instanceof NotFoundException) {
      return res.status(404).json(ApiResponse.notFound());
    }

    return res.status(500).json(ApiResponse.error({
      code: 500,
      message: (exception as any)?.message || 'Lỗi không xác định.'
    }));
  }
}