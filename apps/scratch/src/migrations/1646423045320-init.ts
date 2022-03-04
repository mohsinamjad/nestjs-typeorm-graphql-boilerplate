import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1646423045320 implements MigrationInterface {
  name = 'init1646423045320';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "public"."holders" (
                "id" SERIAL NOT NULL,
                "wallet_address" character varying,
                "contract_address" character varying,
                "latest_transaction_timestamp" TIMESTAMP WITH TIME ZONE,
                "floor_value" character varying,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_3c66d08e1a9bddc5dab5548a468" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "public"."transactions" (
                "id" SERIAL NOT NULL,
                "block_number" character varying,
                "block_timestamp" TIMESTAMP WITH TIME ZONE,
                "block_hash" character varying,
                "transaction_hash" character varying,
                "log_index" integer,
                "value" character varying,
                "contract_type" character varying,
                "transaction_type" character varying,
                "token_address" character varying,
                "token_id" character varying,
                "from_address" integer,
                "to_address" character varying,
                "amount" character varying,
                "verified" integer,
                "transaction_index" integer,
                "operator" character varying,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_100738ed7578add3d7c137f4feb" PRIMARY KEY ("id")
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
                CONSTRAINT "PK_ac43efdae9e425ada1b413b8c52" PRIMARY KEY ("id")
            )
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
  }
}
