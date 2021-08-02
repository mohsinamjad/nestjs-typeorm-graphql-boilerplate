import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNumber, IsString } from 'class-validator';
import Property from '../property.entity';

@InputType({ description: 'new property data' })
export class CreatePropertyInput implements Partial<Property> {
  @IsString()
  @Field({ nullable: false })
  name: string;

  @IsNumber()
  @Field({ nullable: false })
  value: number;

  @Field(() => PropertyConnectInput, { nullable: true })
  parent?: Property;

  @Field(() => [CreatePropertyInput], { nullable: true })
  children?: Property[];
}

@InputType({ description: 'property connectInput' })
export class PropertyConnectInput implements Partial<Property> {
  @Field({ nullable: false })
  id: number;
}

@InputType({ description: 'update property data' })
export class UpdatePropertyInput implements Partial<Property> {
  @IsInt()
  @Field({ nullable: false })
  id: number;

  @IsString()
  @Field({ nullable: true })
  name?: string;

  @IsNumber()
  @Field({ nullable: true })
  value?: number;

  @Field(() => PropertyConnectInput, { nullable: true })
  parent?: Property;
}
