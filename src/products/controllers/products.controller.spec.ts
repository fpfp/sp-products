import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { ProductsController } from './products.controller';
import { ProductsService } from '../products.service';
import { Paginated } from '../../common/interfaces';
import { IProduct } from '../interfaces';
import { CreateProductDto, UpdateProductStockDto } from '../dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let mockProductsService: {
    findAllAndPaginate: jest.Mock<
      Promise<Paginated<IProduct>>,
      [limit: number, offset: number]
    >;
    findById: jest.Mock<Promise<IProduct>, [number]>;
    create: jest.Mock<Promise<IProduct>, [CreateProductDto]>;
    updateStock: jest.Mock<Promise<IProduct>, [number, UpdateProductStockDto]>;
    remove: jest.Mock<Promise<void>, [number]>;
  };

  const mockProducts: IProduct[] = faker.helpers.multiple(
    () => ({
      id: faker.number.int({ max: 100 }),
      name: faker.commerce.productName(),
      price: faker.number.float({ min: 1, max: 100 }),
      stock: faker.number.int(),
      productToken: faker.string.nanoid(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }),
    { count: 20 },
  );

  beforeEach(async () => {
    mockProductsService = {
      findAllAndPaginate: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      updateStock: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(mockProductsService).toBeDefined();
  });

  it('controller should return all products', async () => {
    const result: Paginated<IProduct> = {
      data: mockProducts,
      pagination: {
        total: mockProducts.length,
        nextPage: 2,
        prevPage: null,
        size: 10,
        page: 1,
      },
    };

    mockProductsService.findAllAndPaginate.mockResolvedValue(result);

    expect(await controller.listProducts()).toBe(result);
    expect(mockProductsService.findAllAndPaginate).toHaveBeenCalled();
  });

  it('controller should return a single products', async () => {
    const result = mockProducts[0];
    mockProductsService.findById.mockResolvedValue(result);

    expect(await controller.getProduct(result.id)).toBe(result);
    expect(mockProductsService.findById).toHaveBeenCalledWith(result.id);
  });

  it('controller should create a product', async () => {
    const newProduct = mockProducts[0];
    mockProductsService.create.mockResolvedValue(newProduct);

    expect(await controller.createProduct(newProduct)).toBe(newProduct);
    expect(mockProductsService.create).toHaveBeenCalledWith(newProduct);
  });

  it('controller should update the stock of a product', async () => {
    const newStock = 20;
    const findProduct = mockProducts[0];
    const mockUpdateResult = { ...findProduct, stock: newStock };

    mockProductsService.updateStock.mockResolvedValue(mockUpdateResult);

    expect(
      await controller.updateStock(findProduct.id, { stock: newStock }),
    ).toBe(mockUpdateResult);
    expect(mockProductsService.updateStock).toHaveBeenCalledWith(
      findProduct.id,
      { stock: newStock },
    );
  });

  it('controller should remove a product', async () => {
    const findProduct = mockProducts[15];

    mockProductsService.remove.mockResolvedValue();
    expect(await controller.deleteProduct(findProduct.id)).toBe(undefined);
    expect(mockProductsService.remove).toHaveBeenCalledWith(findProduct.id);
  });
});
