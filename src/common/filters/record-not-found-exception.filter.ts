import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { RecordNotFoundError } from '../errors/record-not-found-error';

@Catch(RecordNotFoundError)
export class RecordNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: RecordNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.NOT_FOUND).json({
      message: exception.message,
      statusCode: HttpStatus.NOT_FOUND,
      error: 'Not found',
    });
  }
}
