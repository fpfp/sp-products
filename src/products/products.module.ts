import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsService } from './products.service';
import { ProductsController } from './controllers';
import { ProductsRepository } from './repositories';
import { ProductModel } from './models';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
