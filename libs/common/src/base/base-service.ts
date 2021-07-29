import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class BaseService<TEntity> {
  protected repository: Repository<TEntity>;

  constructor(repository: Repository<TEntity>) {
    this.repository = repository;
  }

  async findAll(options = {}): Promise<TEntity[]> {
    return this.repository.find(options);
  }

  async findOne(options = {}): Promise<TEntity> {
    return this.repository.findOne(options);
  }

  async save(
    payload: DeepPartial<TEntity> | DeepPartial<TEntity>[],
  ): Promise<TEntity | TEntity[]> {
    const isArray = Array.isArray(payload);
    return isArray
      ? this.saveMany(payload as DeepPartial<TEntity>[])
      : this.saveSingle(payload as DeepPartial<TEntity>);
  }

  async saveSingle(payload: DeepPartial<TEntity>): Promise<TEntity> {
    return this.repository.save(
      await this.repository.create(payload as DeepPartial<TEntity>),
    );
  }

  async saveMany(payload: DeepPartial<TEntity>[]): Promise<TEntity[]> {
    return this.repository.save(
      await this.repository.create(payload as DeepPartial<TEntity>[]),
    );
  }

  async delete(id: number, softDelete = false): Promise<number> {
    if (!softDelete) {
      const { affected } = await this.repository.delete(id);
      return affected;
    }
  }
}
