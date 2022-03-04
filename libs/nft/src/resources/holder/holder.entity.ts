import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'holders' })
export default class Holder {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  wallet_address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contract_address?: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  latest_transaction_timestamp?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  floor_value?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
