import { Connection, Repository } from 'typeorm';

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};

export const defaultMockedRepo = (): Record<string, jest.Mock> => ({
  find: jest.fn().mockReturnValue([{ id: 1, name: 'mohsin' }]),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  softRemove: jest.fn(),
  delete: jest.fn(),
  count: jest.fn(),
});

export const repositoryMockFactory: () => MockType<
  Repository<any>
> = jest.fn(() => defaultMockedRepo());

export const mockConnection = () => ({
  transaction: jest.fn(),
});

export const redisServiceMock = (): Record<string, jest.Mock> => ({
  getClient: jest.fn(() => ({
    exists: jest.fn(),
    set: jest.fn(),
    keys: jest.fn(),
    del: jest.fn(),
    get: jest.fn(),
  })),
});

/**
 * @returns mockedRepo while persisting the jest.fn based on entity
 */
export const memoizedMockedRepo = (): ((
  entity,
) => Record<string, jest.Mock>) => {
  const cache = {};
  // eslint-disable-next-line func-names
  return function (entity): Record<string, jest.Mock> {
    if (cache[entity?.name]) return cache[entity?.name];
    cache[entity?.name] = defaultMockedRepo();
    return cache[entity?.name];
  };
};

/**
 * mocked connection provider for services
 * @returns nest connection provider
 */
export const mockedConnectionProvider = (): {
  provide: any;
  useValue: Record<string, jest.Mock>;
} => ({
  provide: Connection,
  useValue: {
    getRepository: jest.fn(memoizedMockedRepo()),
    getCustomRepository: jest.fn(memoizedMockedRepo()),
  },
});
