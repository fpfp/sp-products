import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsAlphanumeric,
  IsPositive,
  IsNumber,
  IsInt,
} from 'class-validator';
import { IProduct } from '../interfaces';

export class CreateProductDto implements Partial<IProduct> {
  @MinLength(8)
  @IsAlphanumeric()
  @IsString()
  @IsNotEmpty()
  readonly productToken: string;

  @MinLength(3)
  @MaxLength(160)
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsPositive()
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;
}
