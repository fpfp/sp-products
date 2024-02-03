import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { omit } from 'lodash';
import { Sequelize } from 'sequelize-typescript';

import { AppModule } from './../src/app.module';
import { productsSeeder } from './../src/products/seeders';
import { ProductModel } from '../src/products/models';
import { IProduct } from '../src/products/interfaces';
import { UpdateProductStockDto } from '../src/products/dto';
import { HealthStatusEnum } from '../src/common/enums';
import { handleUnexpectedResponse } from './utils-e2e';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let sequelize: Sequelize;
  const seederProducts = productsSeeder(20, ['id']);
  let mockProducts: IProduct[];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // Jest config override some env vars, so a dedicated db will be used for e2e test to avoid conflict
    app = moduleFixture.createNestApplication();
    sequelize = app.get<Sequelize>(Sequelize);
    await sequelize.sync({ force: true });
    mockProducts = (await ProductModel.bulkCreate(seederProducts)).map((item) =>
      item.get({ plain: true }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('HI!');
  });

  it('/health (GET) should check service health', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({ status: HealthStatusEnum.OK });
  });

  it('/products (GET) should list all products', async () => {
    const response = await request(app.getHttpServer()).get('/products');

    handleUnexpectedResponse(response);

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.pagination.total).toEqual(mockProducts.length);
  });

  it('/products/:id (GET) should get a single product', async () => {
    const product = mockProducts[0];

    const response = await request(app.getHttpServer()).get(
      `/products/${product.id}`,
    );

    handleUnexpectedResponse(response);

    const keysToOmit: (keyof IProduct)[] = ['createdAt', 'updatedAt'];

    expect(response.statusCode).toEqual(HttpStatus.OK);

    expect(omit(response.body, keysToOmit)).toEqual(omit(product, keysToOmit));
    for (const k of keysToOmit) {
      expect(response.body).toHaveProperty(k);
    }
  });

  it('/products (POST) should create a new product', async () => {
    const product = productsSeeder(1, ['id', 'createdAt', 'updatedAt'])[0];

    const response = await request(app.getHttpServer())
      .post(`/products`)
      .send(product);

    handleUnexpectedResponse(response, HttpStatus.CREATED);

    expect(response.statusCode).toEqual(HttpStatus.CREATED);

    const keysToOmit: (keyof IProduct)[] = ['id', 'createdAt', 'updatedAt'];

    expect(omit(response.body, keysToOmit)).toEqual(omit(product, keysToOmit));
    for (const k of keysToOmit) {
      expect(response.body).toHaveProperty(k);
    }
  });

  it('/products/:id (PATCH) should update stock of a product', async () => {
    const product = mockProducts[0];
    const payload: UpdateProductStockDto = { stock: 20 };

    const response = await request(app.getHttpServer())
      .patch(`/products/${product.id}`)
      .send(payload);

    handleUnexpectedResponse(response);

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body).toMatchObject(payload);
  });

  it('/products/:id (DELETE) should delete a product', async () => {
    const product = mockProducts[15];

    const response = await request(app.getHttpServer()).delete(
      `/products/${product.id}`,
    );

    handleUnexpectedResponse(response, HttpStatus.NO_CONTENT);

    expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
    expect(response.body).toEqual({});
  });

  it('/products (GET) should return 404 if query params are invalid', async () => {
    const response = await request(app.getHttpServer()).get(
      `/products/?offset=1`,
    );

    handleUnexpectedResponse(response, HttpStatus.BAD_REQUEST);

    expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');
  });

  it('/products/:id (GET) should return 404 if product not exist', async () => {
    const invalidId = 666;

    const response = await request(app.getHttpServer()).get(
      `/products/${invalidId}`,
    );

    handleUnexpectedResponse(response, HttpStatus.NOT_FOUND);

    expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');
  });

  it('/products (POST) should return 400 if payload is invalid', async () => {
    const invalidPayload = {
      name: '',
      price: -10,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(invalidPayload);

    handleUnexpectedResponse(response, HttpStatus.BAD_REQUEST);

    expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBeInstanceOf(Array);
  });

  it('/products/:id (PATCH) should return 404 if product not exist', async () => {
    const payload: UpdateProductStockDto = { stock: 20 };
    const invalidId = 666;

    const response = await request(app.getHttpServer())
      .patch(`/products/${invalidId}`)
      .send(payload);

    handleUnexpectedResponse(response, HttpStatus.NOT_FOUND);

    expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');
  });

  it('/products/:id (PATCH) should return 400 if payload is invalid', async () => {
    const payload: UpdateProductStockDto = { stock: -20 };
    const invalidId = mockProducts[0].id;

    const response = await request(app.getHttpServer())
      .patch(`/products/${invalidId}`)
      .send(payload);

    handleUnexpectedResponse(response, HttpStatus.BAD_REQUEST);

    expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');
  });

  it('/products/:id (DELETE) should return 404 if product not exist', async () => {
    const invalidId = 666;

    const response = await request(app.getHttpServer()).delete(
      `/products/${invalidId}`,
    );

    handleUnexpectedResponse(response, HttpStatus.NOT_FOUND);

    expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');
  });

  afterAll(async () => {
    await sequelize.drop();
    await app.close();
  });
});
