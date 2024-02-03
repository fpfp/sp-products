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
import { ProductsService } from '../services';
import {
  CreateProductDto,
  PaginatedProductsDto,
  ProductDto,
  UpdateProductStockDto,
} from '../dto';
import { PaginationQueryDto } from '../../common/dto';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create a product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product has been created.',
    type: ProductDto,
  })
  @ApiTags('products')
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Read all products' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'size',
    required: false,
    description: 'Number of products per page',
    type: Number,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Return all products with pagination.',
    type: PaginatedProductsDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiTags('products')
  @Get()
  listProducts(@Query() { page = 1, size = 10 }: PaginationQueryDto) {
    return this.productsService.findAllAndPaginate({ page, size });
  }

  @ApiOperation({ summary: 'Get a product' })
  @ApiResponse({
    status: 200,
    description: 'Return a single product.',
    type: ProductDto,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({
    status: 201,
    description: 'Product has been created.',
    type: ProductDto,
  })
  @ApiTags('products')
  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productsService.findById(id);
  }

  @ApiOperation({ summary: 'Update product stock' })
  @ApiBody({ type: UpdateProductStockDto })
  @ApiResponse({
    status: 200,
    description: 'Product stock has been updated.',
    type: ProductDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiTags('products')
  @Patch(':id')
  updateStock(
    @Param('id') id: number,
    @Body() updateProductStockDto: UpdateProductStockDto,
  ) {
    return this.productsService.updateStock(id, updateProductStockDto);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 204, description: 'Product has been deleted.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiTags('products')
  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
