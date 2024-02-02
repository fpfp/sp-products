import { CreationAttributes, Identifier } from 'sequelize';
import { Model } from 'sequelize-typescript';

export interface IRepository<
  M extends Model<M>,
  C extends CreationAttributes<M>,
> {
  findById(id: Identifier): Promise<M>;
  findAll(): Promise<M[]>;
  create(input: C): Promise<M>;
  updateById(id: Identifier, dto: Partial<M>): Promise<number>;
  deleteById(id: Identifier): Promise<number>;
}
