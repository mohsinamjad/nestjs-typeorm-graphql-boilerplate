import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1646512335768 implements MigrationInterface {
  name = 'init1646512335768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "public"."dim_nft_contracts" (
                "id" SERIAL NOT NULL,
                "address" character varying,
                "nft_name" character varying,
                "symbol" character varying,
                "decimals" character varying,
                "logo" character varying,
                "logo_hash" character varying,
                "thumbnail" character varying,
                "block_number" character varying,
                "validated" character varying,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_2fd6e4b926669965c6ab7e80790" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "public"."holders" (
                "id" SERIAL NOT NULL,
                "wallet_address" character varying,
                "contract_address" character varying,
                "latest_transaction_timestamp" TIMESTAMP WITH TIME ZONE,
                "floor_value" character varying,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_aead978fe644f85cfb7e97c58f2" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "public"."transactions" (
                "id" SERIAL NOT NULL,
                "block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL,
                "block_hash" character varying,
                "block_number" integer,
                "buyer_address" character varying,
                "marketplace_address" character varying,
                "price" character varying,
                "price_token_address" character varying,
                "seller_address" character varying,
                "token_address" character varying,
                "token_ids" text array,
                "transaction_hash" character varying,
                "transaction_index" integer,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_199610cbdc5d4f05dcc6a170de9" PRIMARY KEY ("id", "block_timestamp")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "public"."wallets" (
                "id" SERIAL NOT NULL,
                "contract_address" character varying,
                "nft_name" character varying,
                "holder_address" character varying,
                "nft_held_amount" integer,
                "date_of_snapshot" TIMESTAMP WITH TIME ZONE,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_c9437388f3053f1c6d889fcf1d8" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
          select create_hypertable('transactions', 'block_timestamp')
        `);
    await queryRunner.query(`
            SELECT set_chunk_time_interval('transactions', 2592000000)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "public"."wallets"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."transactions"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."holders"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."dim_nft_contracts"
        `);
  }
}
