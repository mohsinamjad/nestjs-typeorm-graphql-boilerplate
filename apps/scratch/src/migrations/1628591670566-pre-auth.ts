import { MigrationInterface, QueryRunner } from 'typeorm';
import { ROLES } from './fixtures/roles';
import * as bcrypt from 'bcryptjs';

export class preAuth1628591670566 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('roles', ['name'])
      .values(ROLES.map((name) => ({ name })))
      .execute();
    const password = await bcrypt.hash('password', 12);
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({
        name: 'Admin',
        email: 'superadmin@gmail.com',
        password,
      })
      .execute();

    const roles = await queryRunner.manager
      .createQueryBuilder()
      .from('roles', 'roles')
      .where('roles.name = :name', { name: ROLES[0] })
      .execute();

    const users = await queryRunner.manager
      .createQueryBuilder()
      .from('users', 'users')
      .where('users.email = :email', { email: 'superadmin@gmail.com' })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user_roles')
      .values({
        usersId: users[0].id,
        rolesId: roles[0].id,
      })
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
    await queryRunner.connection
      .createQueryBuilder()
      .from('users', 'users')
      .where('name = :name', { name: 'Admin' })
      .delete()
      .execute();
  }
}
