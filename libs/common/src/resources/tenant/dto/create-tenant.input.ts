import { Field, InputType } from '@nestjs/graphql';
import JSONScaler from 'graphql-type-json';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import Tenant from '../tenant.entity';

@InputType()
export class CreateTenantInput implements Partial<Tenant> {
  @Field()
  name: string;

  @Field(() => JSONScaler)
  dbConfig: PostgresConnectionOptions;
}
