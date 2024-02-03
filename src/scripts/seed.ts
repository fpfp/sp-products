import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProductsService } from '../products/services';
import { productsSeeder } from '../products/seeders';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productsService = app.get(ProductsService);

  const productsSeed = productsSeeder(20, ['id', 'createdAt', 'updatedAt']);
  for (const productSeed of productsSeed) {
    await productsService
      .create(productSeed)
      .catch((error) => console.error('Error seeding:', error));
  }

  console.log('Seeding completed!');
  await app.close();
}

seed();
