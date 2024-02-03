import { IsNumber, IsOptional } from '@nestjs/class-validator';
import { IPagination } from '../interfaces';

export class PaginationdDto implements IPagination {
  @IsNumber()
  readonly total: number;

  @IsNumber()
  readonly page: number;

  @IsNumber()
  readonly size: number;

  @IsOptional()
  @IsNumber()
  readonly nextPage: number | null;

  @IsOptional()
  @IsNumber()
  readonly prevPage: number | null;
}
