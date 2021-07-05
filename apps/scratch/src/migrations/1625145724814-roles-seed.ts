import { MigrationInterface, QueryRunner } from 'typeorm';
import { ROLES } from './fixtures/roles';

export class rolesSeed1625145724814 implements MigrationInterface {
  name?: string;
  public async up(queryRunner: QueryRunner): Promise<void> {
    await await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('roles', ['name'])
      .values(ROLES.map((name) => ({ name })))
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const nameClauses = ROLES.map((_, index) => `name = :name${index}`);
    const nameClauseVariables = ROLES.reduce((value: any, name, index) => {
      value[`name${index}`] = name;
      return value;
    }, {});
    await queryRunner.connection
      .createQueryBuilder()
      .from('roles', 'roles')
      .where(nameClauses.join(' OR '), nameClauseVariables)
      .delete()
      .execute();
  }
}
