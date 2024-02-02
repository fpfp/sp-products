import { Model, ModelCtor } from 'sequelize-typescript';
import { IRepository, Paginated } from '../interfaces';
import { CreationAttributes, Op, Identifier } from 'sequelize';
import { WhereOptions } from 'sequelize/types';
import { PaginationQueryDto } from '../dto';

export class BaseRepository<
  M extends Model,
  C extends CreationAttributes<M>,
  ID extends Identifier = number,
> implements IRepository<M, C>
{
  protected repo: ModelCtor<M>;
  constructor(repo: ModelCtor<M>) {
    this.repo = repo;
  }

  paginate(data: M[], total: number, page: number, size: number): Paginated<M> {
    const hasNextPage = total > page * size;
    const hasPrevPage = page > 1;
    const pagination = {
      total,
      page,
      size,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPrevPage ? page - 1 : null,
    };

    return { data, pagination };
  }

  async findById(id: ID): Promise<M | null> {
    return this.repo.findByPk(id);
  }

  async findByIds(ids: ID[]): Promise<M[] | []> {
    const where: WhereOptions = {
      id: {
        [Op.in]: ids,
      },
    };

    return this.repo.findAll({
      where,
    });
  }

  async findAll(): Promise<M[] | []> {
    return this.repo.findAll();
  }

  async findAllAndPaginate({
    page,
    size,
  }: PaginationQueryDto): Promise<Paginated<M>> {
    const { count, rows } = await this.repo.findAndCountAll({
      limit: size,
      offset: (page - 1) * size,
    });

    return this.paginate(rows, count, page, size);
  }

  async create(dto: C): Promise<M> {
    return this.repo.create(dto);
  }

  async updateById(id: ID, dto: Partial<M>): Promise<number> {
    const where: WhereOptions = { id };

    const [affectedCount] = await this.repo.update(dto, {
      where,
    });

    return affectedCount;
  }

  async save(model: M): Promise<M> {
    return model.save();
  }

  async deleteById(id: ID): Promise<number> {
    const where: WhereOptions = { id };
    return this.repo.destroy({ where });
  }
}
