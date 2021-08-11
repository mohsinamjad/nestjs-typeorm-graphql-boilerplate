import { MigrationInterface, QueryRunner } from 'typeorm';
import testConfig from './fixtures/test-tenant';

export class testTenant1628595848591 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('tenants')
      .values([{ name: testConfig.name, dbConfig: testConfig }])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .from('tenants', 'tenants')
      .where(`name = :name`, { name: testConfig.name })
      .delete()
      .execute();
  }
}
