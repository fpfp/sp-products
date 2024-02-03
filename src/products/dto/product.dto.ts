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
import { ApiProperty } from '@nestjs/swagger';

import { IProduct } from '../interfaces';

export class ProductDto implements IProduct {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of the product' })
  readonly id: number;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2023-09-27 17:06:01',
    description: 'Creation date of the product',
  })
  readonly createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2023-09-27 17:06:01',
    description: 'Last update of the product',
  })
  readonly updatedAt: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(160)
  @ApiProperty({
    example: 'Awesome Knife',
    description: 'Name of the product',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'AWK-12345', description: 'Unique product token' })
  readonly productToken: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 19.99, description: 'Price of the product' })
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  @ApiProperty({ example: 100, description: 'Stock quantity of the product' })
  readonly stock: number;
}
