import { Field, ObjectType } from '@nestjs/graphql';
import JSONScaler from 'graphql-type-json';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@ObjectType()
@Entity({ name: 'tenants' })
export default class Tenant {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => JSONScaler)
  @Column('simple-json')
  dbConfig: PostgresConnectionOptions;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
