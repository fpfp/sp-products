import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { EnvEnum } from '../enums';

class EnvironmentVariables {
  @IsEnum(EnvEnum)
  NODE_ENV: EnvEnum;

  @IsNumber()
  PORT: number;

  @IsString()
  DB_HOSTNAME: string;

  @IsString()
  DB_PORT: string;

  @IsString()
  DB_DATABASE: string;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  // Optional vars
  @IsOptional()
  @IsString()
  CORS_ORIGIN?: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
