import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'properties' })
@Tree('materialized-path')
export default class Property {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  value: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associations
  @Field(() => [Property])
  @Type(() => Property)
  @TreeChildren({ cascade: true })
  children?: Property[];

  @Field(() => Property, { nullable: true })
  @TreeParent()
  @Type(() => Property)
  parent?: Property;
}
