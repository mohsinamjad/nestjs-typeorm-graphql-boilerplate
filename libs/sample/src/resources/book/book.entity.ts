import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Author from '../author/author.entity';
import { BookCategory } from '../bookCategory/book-category.entity';
import Category from '../category/category.entity';

@ObjectType()
@Entity({ name: 'books' })
export default class Book extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.books, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  @Type(() => Author)
  author: Author;

  /**
   * used for fetching relational entities such as
   *  const { categories } = await this.bookService.findOne({
      relations: ['categories'],
      where: {
        id: root.id,
      },
    });
   * */
  @Type(() => Category)
  @ManyToMany(() => Category, {})
  @JoinTable({
    name: 'book_categories',
    joinColumn: {
      name: 'bookId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  @Type(() => BookCategory)
  @Field(() => [BookCategory])
  @OneToMany(() => BookCategory, (bookCategory) => bookCategory.bookId)
  bookCategories: BookCategory[];
}
