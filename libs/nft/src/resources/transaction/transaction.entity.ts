import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'transactions' })
export default class Transaction {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  block_number?: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  block_timestamp?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  block_hash?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  transaction_hash?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  log_index?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  value?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contract_type?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  transaction_type?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  token_address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  token_id?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  from_address?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  to_address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  amount?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  verified?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  transaction_index?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  operator?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}

/**
 * 
 * 
 * 
CREATE TABLE public.nft_current_holding
(
    wallet_address character varying COLLATE pg_catalog."default",
    contract_address character varying COLLATE pg_catalog."default",
    latest_transaction_timestamp timestamp with time zone,
    floor_value character varying COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE public.nft_current_holding
    OWNER to tsdbadmin;


CREATE TABLE public.nft_holders
(
    contract_address character varying COLLATE pg_catalog."default",
    nft_name character varying COLLATE pg_catalog."default",
    holder_address character varying COLLATE pg_catalog."default",
    nft_held_amount bigint,
    date_of_snapshot timestamp with time zone
)

TABLESPACE pg_default;

ALTER TABLE public.nft_holders
    OWNER to tsdbadmin;


CREATE TABLE public.wallet_address_trades
(
    nft_contract_address character varying COLLATE pg_catalog."default",
    mint_contract_address character varying COLLATE pg_catalog."default",
    buy_contract_address character varying COLLATE pg_catalog."default",
    sell_contract_address character varying COLLATE pg_catalog."default",
    eth_value character varying COLLATE pg_catalog."default",
    usd_amount character varying COLLATE pg_catalog."default",
    "timestamp" timestamp with time zone
)

TABLESPACE pg_default;

ALTER TABLE public.wallet_address_trades
    OWNER to tsdbadmin;


-- Table: public.transactions

-- DROP TABLE public.transactions;

TABLESPACE pg_default;

ALTER TABLE public.transactions
    OWNER to tsdbadmin;
-- Index: transactions_block_timestamp_idx

-- DROP INDEX public.transactions_block_timestamp_idx;

CREATE INDEX transactions_block_timestamp_idx
    ON public.transactions USING btree
    (block_timestamp DESC NULLS FIRST)
    TABLESPACE pg_default;

-- Trigger: ts_insert_blocker

-- DROP TRIGGER ts_insert_blocker ON public.transactions;

CREATE TRIGGER ts_insert_blocker
    BEFORE INSERT
    ON public.transactions
    FOR EACH ROW
    EXECUTE PROCEDURE _timescaledb_internal.insert_blocker(\x);
 */
