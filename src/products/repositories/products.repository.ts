import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from '../models';
import { IProductCreationAttrs } from '../interfaces';
import { BaseRepository } from '../../common/repositories';

@Injectable()
export class ProductsRepository extends BaseRepository<
  ProductModel,
  IProductCreationAttrs,
  number
> {
  protected readonly logger = new Logger(ProductsRepository.name);

  constructor(@InjectModel(ProductModel) protected repo: typeof ProductModel) {
    super(ProductModel);
  }
}
