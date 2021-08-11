import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import JSONScaler from 'graphql-type-json';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { CreateTenantInput } from './create-tenant.input';

@InputType()
export class UpdateTenantInput extends PartialType(CreateTenantInput) {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => JSONScaler)
  dbConfig: PostgresConnectionOptions;
}
