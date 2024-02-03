import {
  Column,
  CreatedAt,
  Model,
  Table,
  DataType,
  UpdatedAt,
} from 'sequelize-typescript';
import { IProduct, IProductCreationAttrs } from '../interfaces';

@Table({ tableName: 'products' })
export class ProductModel extends Model<IProduct, IProductCreationAttrs> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  productToken: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    get() {
      return parseFloat(this.getDataValue('price'));
    },
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stock: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
