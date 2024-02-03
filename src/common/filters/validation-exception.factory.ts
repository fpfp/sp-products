import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const validationExceptionFactory = (
  errors: ValidationError[],
): BadRequestException => {
  const result = errors.map(
    (error) =>
      `Input error: ${error.constraints[Object.keys(error.constraints).at(-1)]}`,
  );
  return new BadRequestException(result);
};
