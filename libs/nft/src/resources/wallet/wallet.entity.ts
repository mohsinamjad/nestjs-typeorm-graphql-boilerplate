import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'wallets' })
export default class Wallet {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contract_address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nft_name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  holder_address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nft_held_amount?: number;

  @Field({ nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  date_of_snapshot?: Date;

  @Field()
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
