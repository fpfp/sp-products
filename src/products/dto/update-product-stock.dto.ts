import { IProduct } from '../interfaces';

export class UpdateProductStockDto implements Partial<IProduct> {
  readonly stock: number;
}
