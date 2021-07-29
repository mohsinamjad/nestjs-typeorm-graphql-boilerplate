import { Type } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseService } from './base-service';
import * as p from 'pluralize';
import { camelCase } from 'lodash';

export function BaseResolver<
  TEntity extends Type<unknown>,
  TCreateInputType,
  TUpdateInputType
>(
  entityRef: TEntity,
  createType: TCreateInputType,
  updateType: TUpdateInputType,
): any {
  @Resolver({ isAbstract: true }) // SDL (Schema Definition Language statements) shouldn't be generated for this class
  abstract class BaseResolverHost {
    public service: BaseService<TEntity>;
    constructor(service: BaseService<TEntity>) {
      this.service = service;
    }

    @Query(() => [entityRef], {
      name: `${camelCase(p.plural(entityRef.name))}`,
    })
    async get(): Promise<TEntity[]> {
      return this.service.findAll();
    }

    @Mutation(() => [entityRef], { name: `create${entityRef.name}` })
    async create(
      @Args('data', { type: () => [createType] })
      data: TCreateInputType[],
    ): Promise<TEntity[]> {
      return this.service.saveMany(data);
    }

    @Mutation(() => [entityRef], { name: `update${entityRef.name}` })
    async update(
      @Args('data', { type: () => [updateType] })
      data: TUpdateInputType[],
    ): Promise<TEntity[]> {
      return this.service.saveMany(data);
    }

    @Mutation(() => Int, { name: `delete${entityRef.name}` })
    async delete(@Args('id') id: number): Promise<number> {
      return this.service.delete(id);
    }
  }

  return BaseResolverHost;
}
