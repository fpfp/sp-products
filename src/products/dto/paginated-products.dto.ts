import { IsArray, IsObject, ValidateNested } from '@nestjs/class-validator';
import { Type } from 'class-transformer';

import { IProduct } from '../interfaces';
import { IPaginated, IPagination } from '../../common/interfaces';
import { ProductDto } from './product.dto';
import { PaginationdDto } from '../../common/dto';

export class PaginatedProductsDto implements IPaginated<IProduct> {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  data: ProductDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => PaginationdDto)
  pagination: IPagination;
}
