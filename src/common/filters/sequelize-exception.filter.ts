import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  UniqueConstraintError,
  ForeignKeyConstraintError,
  EmptyResultError,
} from 'sequelize';

@Catch(UniqueConstraintError, ForeignKeyConstraintError, EmptyResultError)
export class SequelizeExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      | UniqueConstraintError
      | ForeignKeyConstraintError
      | EmptyResultError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred';
    let error = exception.message;

    if (exception instanceof UniqueConstraintError) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Unique constraint violation: The record already exists.';
      error = 'Bad request';
    } else if (exception instanceof ForeignKeyConstraintError) {
      statusCode = HttpStatus.BAD_REQUEST;
      message =
        'Foreign key constraint violation: Related record could not be found.';
    } else if (exception instanceof EmptyResultError) {
      statusCode = HttpStatus.NOT_FOUND;
      message =
        'Record not found: The record you are trying to update does not exist.';
    }

    response.status(statusCode).json({
      message,
      error,
      statusCode: statusCode,
    });
  }
}
