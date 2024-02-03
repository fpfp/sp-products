import { faker } from '@faker-js/faker';
import { omit } from 'lodash';
import { IProduct } from 'src/products/interfaces';

export function productsSeeder(count: number): IProduct[];
export function productsSeeder<T extends (keyof IProduct)[]>(
  count: number,
  omitKeys: T,
): Omit<IProduct, keyof T>[];

export function productsSeeder<T extends (keyof IProduct)[]>(
  count: number,
  omitKeys?: T,
) {
  const products = faker.helpers.multiple(
    () => ({
      id: faker.number.int({ max: 100 }),
      name: faker.commerce.productName(),
      price: faker.number.float({ min: 1, max: 100, fractionDigits: 2 }),
      stock: faker.number.int({ min: 0, max: 100 }),
      productToken: faker.string.nanoid(8),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }),
    { count },
  );
  if (omitKeys) {
    return products.map((p) => omit(p, omitKeys)) as Omit<IProduct, keyof T>[];
  }
  return products;
}
