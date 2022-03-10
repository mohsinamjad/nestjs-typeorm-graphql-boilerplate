import { MigrationInterface, QueryRunner } from 'typeorm';

export class base1646924353101 implements MigrationInterface {
  name = 'base1646924353101';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "public"."books" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "author_id" integer,
                CONSTRAINT "PK_f3f6925f444530b906b67edf63e" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "public"."authors" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "phone" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_d40c793159ff60993c821631ec9" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "public"."properties" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "value" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "mpath" character varying DEFAULT '',
                "parentId" integer,
                CONSTRAINT "PK_c642a80b109af9f6896eec6e80e" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."books"
            ADD CONSTRAINT "FK_0406b29708b2979ce516d192c40" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."properties"
            ADD CONSTRAINT "FK_c13adaf2d16f944890737464dac" FOREIGN KEY ("parentId") REFERENCES "public"."properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."user_roles"
            ADD CONSTRAINT "FK_c9e22c69c9f91908c487f9bfbfb" FOREIGN KEY ("rolesId") REFERENCES "public"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."user_roles"
            ADD CONSTRAINT "FK_f53f2d22cd7b54bb6f427fdfa30" FOREIGN KEY ("usersId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."user_roles" DROP CONSTRAINT "FK_f53f2d22cd7b54bb6f427fdfa30"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."user_roles" DROP CONSTRAINT "FK_c9e22c69c9f91908c487f9bfbfb"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."properties" DROP CONSTRAINT "FK_c13adaf2d16f944890737464dac"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."books" DROP CONSTRAINT "FK_0406b29708b2979ce516d192c40"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_f53f2d22cd7b54bb6f427fdfa3"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_c9e22c69c9f91908c487f9bfbf"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."user_roles"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."properties"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."authors"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."books"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."roles"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."users"
        `);
  }
}
