import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from '../products.service';
import { CreateProductDto, UpdateProductStockDto } from '../dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  listProducts(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ) {
    return this.productsService.findAllAndPaginate({ page, size });
  }

  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productsService.findById(id);
  }

  @Patch(':id')
  updateStock(
    @Param('id') id: number,
    @Body() updateProductStockDto: UpdateProductStockDto,
  ) {
    return this.productsService.updateStock(id, updateProductStockDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
