import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'transactions' })
export default class Transaction {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @PrimaryColumn({ type: 'timestamptz', nullable: false })
  block_timestamp?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  block_hash?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  block_number?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  buyer_address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  marketplace_address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  price?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  price_token_address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  seller_address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  token_address?: string;

  @Field({ nullable: true })
  @Column('text', { array: true, nullable: true })
  token_ids?: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  transaction_hash?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  transaction_index?: number;

  @Field()
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
}
