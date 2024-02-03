import {
  IsNotEmpty,
  IsDate,
  IsInt,
  IsNumber,
  IsString,
  IsPositive,
  MinLength,
  MaxLength,
} from '@nestjs/class-validator';

import { IProduct } from '../interfaces';

export class ProductDto implements IProduct {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsDate()
  readonly createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  readonly updatedAt: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(160)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly productToken: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  readonly stock: number;
}
