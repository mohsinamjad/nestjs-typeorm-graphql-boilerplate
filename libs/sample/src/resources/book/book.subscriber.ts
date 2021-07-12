/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { logger } from '@libs/common/logger';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
  Connection,
} from 'typeorm';
import { TransactionCommitEvent } from 'typeorm/subscriber/event/TransactionCommitEvent';
import { TransactionRollbackEvent } from 'typeorm/subscriber/event/TransactionRollbackEvent';
import { TransactionStartEvent } from 'typeorm/subscriber/event/TransactionStartEvent';
import Book from './book.entity';

@EventSubscriber()
export class BookSubscriber implements EntitySubscriberInterface<Book> {
  constructor(
    connection: Connection,
    @InjectQueue('book') private readonly bookQueue: Queue,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Book;
  }
  /**
   * Called after entity is loaded.
   */
  afterLoad(entity: Book) {}

  /**
   * Called before post insertion.
   */
  beforeInsert(event: InsertEvent<Book>) {}

  /**
   * Called after entity insertion.
   */
  afterInsert(event: InsertEvent<Book>) {}

  /**
   * Called before entity update.
   */
  beforeUpdate(event: UpdateEvent<Book>) {}

  /**
   * Called after entity update.
   */
  afterUpdate(event: UpdateEvent<Book>) {}

  /**
   * Called before entity removal.
   */
  beforeRemove(event: RemoveEvent<Book>) {}

  /**
   * Called after entity removal.
   */
  async afterRemove(event: RemoveEvent<Book>) {
    logger.info(
      `AFTER ENTITY REMOVED: ${JSON.stringify(event.entity, null, 2)}`,
    );
    await this.bookQueue.add('clearAuthors', event.entity);
  }

  /**
   * Called before transaction start.
   */
  beforeTransactionStart(event: TransactionStartEvent) {}

  /**
   * Called after transaction start.
   */
  afterTransactionStart(event: TransactionStartEvent) {}

  /**
   * Called before transaction commit.
   */
  beforeTransactionCommit(event: TransactionCommitEvent) {}

  /**
   * Called after transaction commit.
   */
  afterTransactionCommit(event: TransactionCommitEvent) {}

  /**
   * Called before transaction rollback.
   */
  beforeTransactionRollback(event: TransactionRollbackEvent) {}

  /**
   * Called after transaction rollback.
   */
  afterTransactionRollback(event: TransactionRollbackEvent) {}
}
