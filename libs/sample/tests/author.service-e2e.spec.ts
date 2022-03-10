import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../apps/scratch/src/app.module';
import * as request from 'supertest';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('AuthorModule', () => {
    it('Author cat, get by id, delete', async () => {
      const author = {
        name: 'Mohsin Amjad',
        phone: '45',
        books: [
          {
            title: 'suits',
          },
        ],
      };
      const data = await request(app.getHttpServer())
        .post('/author/create')
        .send(author)
        .expect(201);
      expect(data.body.name).toEqual(author.name);
      await request(app.getHttpServer())
        .get(`/author/${data.body.id}`)
        .expect(200);
      return request(app.getHttpServer())
        .delete(`/author/${data.body.id}`)
        .expect(200);
    });
  });
});
