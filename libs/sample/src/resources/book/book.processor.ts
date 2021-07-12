import { logger } from '@libs/common/logger';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AuthorService } from '../author/author.service';

@Processor('book')
export class BookProcessor {
  constructor(private readonly authorService: AuthorService) {}

  @Process('clearAuthors')
  async clearAuthors(job: Job) {
    try {
      logger.info('Start clearAuthors...');
      logger.info(job.data);
      const book = job.data;
      const author = await this.authorService.findOne({
        where: { id: book?.author?.id },
        relations: ['books'],
      });
      if (author?.books?.length === 0) {
        await this.authorService.delete(author.id);
      }
      logger.info('clearAuthors completed');
    } catch (err) {
      logger.error(err);
    }
  }
}
