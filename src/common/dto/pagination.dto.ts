import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from '@nestjs/class-validator';
import { IPagination } from '../interfaces';

export class PaginationdDto implements IPagination {
  @IsNumber()
  @ApiProperty({ example: 50, description: 'Total items' })
  readonly total: number;

  @IsNumber()
  @ApiProperty({ example: 1, description: 'Current page' })
  readonly page: number;

  @IsNumber()
  @ApiProperty({ example: 10, description: 'Items per page' })
  readonly size: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'Next page number if available' })
  readonly nextPage: number | null;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: null,
    description: 'Previous page number if available',
  })
  readonly prevPage: number | null;
}
