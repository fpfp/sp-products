import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';

export function handleUnexpectedResponse(
  response: request.Response,
  statusCode = HttpStatus.OK,
) {
  if (response.statusCode !== statusCode) {
    console.error(response.statusCode, response.body);
  }
}
