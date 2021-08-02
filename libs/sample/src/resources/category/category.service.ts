import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import Category from './category.entity';
import { CreateCategoryInput, UpdateCategoryInput } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private connection: Connection) {}

  async findAll(): Promise<Category[]> {
    return this.connection.manager.find(Category);
  }

  async findOne(options = {}): Promise<Category> {
    return this.connection.manager.findOne(Category, options);
  }

  async create(category: CreateCategoryInput): Promise<Category> {
    const createdCategory = await this.connection.manager.create(
      Category,
      category,
    );
    const result = await this.connection.manager.save(
      Category,
      createdCategory,
    );
    return result;
  }

  async update(category: UpdateCategoryInput): Promise<Category> {
    return await this.connection.manager.save(Category, category);
  }

  async delete(id: number, softDelete = false): Promise<number> {
    if (!softDelete) {
      const { affected } = await this.connection.manager.delete(Category, {
        id,
      });
      return affected;
    }
  }
}
