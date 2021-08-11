import { BadRequestException } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Connection, getConnection, createConnection } from 'typeorm';
import Tenant from './tenant.entity';

export default function tenantMiddleware(
  connection: Connection,
  entities: EntityClassOrSchema[],
) {
  return async (req, res, next) => {
    const tenant: Tenant = await connection
      .getRepository(Tenant)
      .findOne({ where: { name: req.headers?.tenant } });
    try {
      if (!tenant) {
        getConnection('default');
        return next();
        // throw new BadRequestException(
        //   'Database Connection Error',
        //   'There is a Error with the Database!',
        // );
      }

      getConnection(tenant.name);
      next();
    } catch (e) {
      const createdConnection: Connection = await createConnection({
        name: tenant.name,
        type: 'postgres',
        host: 'localhost', //tenant.dbConfig.host,
        port: tenant.dbConfig.port,
        username: tenant.dbConfig.username,
        password: tenant.dbConfig.password,
        database: tenant.name,
        entities,
        synchronize: false,
        logging: true,
      });

      if (createdConnection) {
        next();
      } else {
        throw new BadRequestException(
          'Database Connection Error',
          'There is a Error with the Database!',
        );
      }
    }
  };
}
