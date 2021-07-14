import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { CreatePropertyInput, UpdatePropertyInput } from './dto/property.dto';
import Property from './property.entity';
import { PropertyService } from './property.service';

@Resolver(() => Property)
export class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  @Query(() => [Property])
  async properties(): Promise<Property[]> {
    return this.propertyService.findAll();
  }

  @Mutation(() => Property)
  async createProperty(
    @Args('data') property: CreatePropertyInput,
  ): Promise<Property> {
    return this.propertyService.create(property);
  }

  @Mutation(() => Property)
  async updateProperty(
    @Args('data') property: UpdatePropertyInput,
  ): Promise<Property> {
    return this.propertyService.update(property);
  }

  @Mutation(() => Int)
  async deleteProperty(@Args('id') id: number): Promise<number> {
    return this.propertyService.delete(id);
  }

  @ResolveField()
  async children(@Root() root: Property): Promise<Property[]> {
    return this.propertyService.findDescendantsTree(root);
  }

  @ResolveField()
  async parent(@Root() root: Property): Promise<Property> {
    return this.propertyService.findAncestorsTree(root);
  }
}
