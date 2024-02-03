import { PickType } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class UpdateProductStockDto extends PickType(ProductDto, [
  'stock',
] as const) {}
