import { MigrationInterface, QueryRunner } from 'typeorm';

export class tenant1628595749962 implements MigrationInterface {
  name = 'tenant1628595749962';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."tenants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "dbConfig" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_14cceb6689f2d607c674981eabe" UNIQUE ("name"), CONSTRAINT "PK_12eb0ddb3c8951226d19a104b35" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "public"."tenants"`);
  }
}
