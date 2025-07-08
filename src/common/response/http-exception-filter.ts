import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ApiResponse } from './api-response';
import { ERROR_MESSAGES_MAP } from '../const/validate-error-list.const';
@Catch(HttpException)
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

    // Lỗi query từ cơ sở dữ liệu (TypeORM)
    if (exception instanceof QueryFailedError) {
      const err = exception as any;
      const message = err.message as string;

      // Lỗi trùng khóa (duplicate key)
      if (
        message.includes('duplicate key') ||
        message.includes('UNIQUE constraint failed') ||
        message.includes('violates unique constraint')
      ) {
        return res.status(400).json(
          ApiResponse.error({
            code: 400,
            message:
              'Dữ liệu bạn gửi đã tồn tại, vui lòng kiểm tra lại (bị trùng khóa).',
          }),
        );
      }

      // Lỗi khác của SQL
      return res.status(500).json(
        ApiResponse.error({
          code: 500,
          message: 'Lỗi truy vấn cơ sở dữ liệu.'
        }),
      );
    }

    // Trường hợp lỗi không xác định khác
    return res.status(500).json(
      ApiResponse.error({
        code: 500,
        message: 'Lỗi không xác định.'
      }),
    );
  }
}