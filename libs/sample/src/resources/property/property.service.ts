import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreatePropertyInput, UpdatePropertyInput } from './dto/property.dto';
import Property from './property.entity';
import { PropertyRepository } from './property.repository';

@Injectable()
export class PropertyService {
  constructor(
    private propertyRepository: PropertyRepository,
    private readonly connection: Connection,
  ) {}

  async findAll(options = {}): Promise<Property[]> {
    return this.propertyRepository.find(options);
  }

  async findOne(options = {}): Promise<Property> {
    return this.propertyRepository.findOne(options);
  }

  async create({ parent, ...rest }: CreatePropertyInput): Promise<Property> {
    const createdProperty = await this.propertyRepository.create({
      ...rest,
    });
    if (parent) {
      const parentInstance = await this.propertyRepository.findOne(parent.id);
      if (!parentInstance)
        throw new UnprocessableEntityException('Parent not found');
      createdProperty.parent = parentInstance;
    }
    const result = await this.propertyRepository.save(createdProperty);
    return result;
  }

  async update(property: UpdatePropertyInput): Promise<Property> {
    return await this.propertyRepository.save(property);
  }

  async delete(id: number, softDelete = false): Promise<number> {
    if (!softDelete) {
      const { affected } = await this.propertyRepository.delete({ id });
      return affected;
    }
  }

  async findAncestorsTree(node: Property): Promise<Property> {
    const repo = this.connection.getTreeRepository(Property);
    const nodeInstance = await repo.findAncestorsTree(node);
    return nodeInstance.parent;
  }

  async findDescendantsTree(node: Property): Promise<Property[]> {
    const repo = this.connection.getTreeRepository(Property);
    const nodeInstance = await repo.findDescendantsTree(node);
    return nodeInstance.children;
  }
}
