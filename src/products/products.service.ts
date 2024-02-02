import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './repositories';
import { ProductModel } from './models/product.model';
import { CreateProductDto, UpdateProductStockDto } from './dto';
import { Paginated } from '../common/interfaces';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { RecordNotFoundError } from '../common/errors';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto): Promise<ProductModel> {
    return this.productsRepository.create(createProductDto);
  }

  async findById(id: number, mandatory = true): Promise<ProductModel> {
    const record = await this.productsRepository.findById(id);
    if (!record && mandatory) {
      throw new RecordNotFoundError(id);
    }
    return record;
  }

  async findAllAndPaginate(
    input: PaginationQueryDto,
  ): Promise<Paginated<ProductModel>> {
    return this.productsRepository.findAllAndPaginate(input);
  }

  async updateStock(
    id: number,
    updateProductStockDto: UpdateProductStockDto,
    mandatory = true,
  ): Promise<ProductModel> {
    const affectedCount = await this.productsRepository.updateById(id, {
      stock: updateProductStockDto.stock,
    });

    if (!affectedCount && mandatory) {
      throw new RecordNotFoundError(id);
    }
    return this.productsRepository.findById(id);
  }

  async remove(id: number, mandatory = true): Promise<number> {
    const deletedCount = await this.productsRepository.deleteById(id);
    if (!deletedCount && mandatory) {
      throw new RecordNotFoundError(id);
    }
    return deletedCount;
  }
}
