import { TENANT_CONNECTION } from '@libs/common/resources/tenant/tenant.module';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreatePropertyInput, UpdatePropertyInput } from './dto/property.dto';
import Property from './property.entity';

@Injectable()
export class PropertyService {
  private propertyRepository;
  constructor(@Inject(TENANT_CONNECTION) private connection) {
    this.propertyRepository = connection.getRepository(Property);
  }

  async findAll(options = {}): Promise<Property[]> {
    return this.propertyRepository.find(options);
  }

  async findOne(options = {}): Promise<Property> {
    return this.propertyRepository.findOne(options);
  }

  async create(property: CreatePropertyInput): Promise<Property> {
    const createdProperty = plainToClass(Property, property);
    if (createdProperty.parent) {
      const parentInstance = await this.propertyRepository.findOne(
        createdProperty.parent?.id,
      );
      if (!parentInstance)
        throw new UnprocessableEntityException('Parent not found');
      createdProperty.parent = parentInstance;
    }
    const result = await this.propertyRepository.save(createdProperty);
    return result;
  }

  async update(property: UpdatePropertyInput): Promise<Property> {
    const createdProperty = plainToClass(Property, property);
    if (createdProperty.parent) {
      const parentInstance = await this.propertyRepository.findOne(
        createdProperty.parent?.id,
      );
      if (!parentInstance)
        throw new UnprocessableEntityException('Parent not found');
      createdProperty.parent = parentInstance;
    }
    const result = await this.propertyRepository.save(createdProperty);
    return result;
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
