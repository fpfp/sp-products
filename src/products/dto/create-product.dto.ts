import { PickType } from '@nestjs/swagger';
import { ProductDto } from './product.dto';
import { IProductCreationAttrs } from '../interfaces';

export class CreateProductDto
  extends PickType(ProductDto, [
    'name',
    'productToken',
    'price',
    'stock',
  ] as const)
  implements IProductCreationAttrs {}
