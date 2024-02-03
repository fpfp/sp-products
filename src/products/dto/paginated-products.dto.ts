import { IsArray, IsObject, ValidateNested } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IProduct } from '../interfaces';
import { IPaginated, IPagination } from '../../common/interfaces';
import { ProductDto } from './product.dto';
import { PaginationdDto } from '../../common/dto';

export class PaginatedProductsDto implements IPaginated<IProduct> {
  @ApiProperty({ description: 'Products array', type: [ProductDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  data: ProductDto[];

  @ApiProperty({ description: 'Pagination info', type: PaginationdDto })
  @IsObject()
  @ValidateNested()
  @Type(() => PaginationdDto)
  pagination: IPagination;
}
