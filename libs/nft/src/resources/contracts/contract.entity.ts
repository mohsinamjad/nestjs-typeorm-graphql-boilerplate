import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'dim_nft_contracts' })
export default class Contract {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nft_name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  symbol?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  decimals?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  logo_hash?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  thumbnail?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  block_number?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  validated?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
