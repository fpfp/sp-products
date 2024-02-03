import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from '../repositories';

import { getModelToken } from '@nestjs/sequelize';
import { ProductModel } from '../models';
import { IProduct, IProductCreationAttrs } from '../interfaces';
import { RecordNotFoundError } from '../../common/errors';
import { productsSeeder } from '../seeders';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: ProductsRepository;
  let mockProductModel: {
    findAll: jest.Mock<Promise<IProduct[]>>;
    findAndCountAll: jest.Mock<
      Promise<{ count: number; rows: IProduct[] }>,
      [limit: number, offset: number]
    >;
    findByPk: jest.Mock<Promise<IProduct | null>, [number]>;
    create: jest.Mock<Promise<IProduct>, [IProductCreationAttrs]>;
    update: jest.Mock<Promise<[number]>, [Partial<IProduct>]>;
    save: jest.Mock<Promise<IProduct>, [IProduct]>;
    destroy: jest.Mock<Promise<number>, [number]>;
  };

  const mockProducts = productsSeeder(20);

  beforeEach(async () => {
    mockProductModel = {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      findAndCountAll: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        ProductsRepository,
        {
          provide: getModelToken(ProductModel),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductsRepository>(ProductsRepository);
    mockProductModel = module.get(getModelToken(ProductModel));
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('model should be defined', () => {
    expect(mockProductModel).toBeDefined();
  });

  it('service should create a product', async () => {
    const newProduct = mockProducts[0];
    mockProductModel.create.mockResolvedValue(newProduct);
    expect(await service.create(newProduct)).toEqual(newProduct);
    expect(mockProductModel.create).toHaveBeenCalledWith(newProduct);
  });

  it('service should return all products', async () => {
    const paginatedItems = {
      rows: mockProducts,
      count: mockProducts.length,
    };
    mockProductModel.findAndCountAll.mockResolvedValue(paginatedItems);

    const result = await service.findAllAndPaginate({ page: 1, size: 10 });
    expect(result.data).toEqual(mockProducts);
    expect(result.pagination.total).toEqual(mockProducts.length);
    expect(result.pagination.page).toEqual(1);
    expect(result.pagination.prevPage).toEqual(null);
    expect(mockProductModel.findAndCountAll).toHaveBeenCalled();
  });

  it('service should return a single product', async () => {
    const findProduct = mockProducts[0];

    mockProductModel.findByPk.mockResolvedValue(findProduct);

    const result = await service.findById(findProduct.id);
    expect(result).toEqual(findProduct);
    expect(mockProductModel.findByPk).toHaveBeenCalledWith(findProduct.id);
  });

  it('service should throw an error if the product does not exist', async () => {
    const productId = 666;
    mockProductModel.findByPk.mockResolvedValue(null);

    try {
      await service.findById(productId);
    } catch (error) {
      expect(error).toBeInstanceOf(RecordNotFoundError);
    }
  });

  it('service should update the stock of a product', async () => {
    const newStock = 20;
    const findProduct = mockProducts[0];
    const mockUpdateResult = { ...findProduct, stock: newStock };

    mockProductModel.update.mockResolvedValue([1]);
    mockProductModel.findByPk.mockResolvedValue(mockUpdateResult);

    const result = await service.updateStock(findProduct.id, {
      stock: newStock,
    });

    expect(result).toEqual(mockUpdateResult);
    expect(mockProductModel.update).toHaveBeenCalledWith(
      { stock: newStock },
      { where: { id: findProduct.id } },
    );
  });

  it('service should remove a product', async () => {
    const findProduct = mockProducts[15];

    mockProductModel.destroy.mockResolvedValue(1);

    await service.remove(findProduct.id);

    expect(mockProductModel.destroy).toHaveBeenCalledWith({
      where: { id: findProduct.id },
    });
  });
});
