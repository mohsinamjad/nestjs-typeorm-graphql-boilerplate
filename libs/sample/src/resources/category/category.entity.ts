import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Book from '../book/book.entity';
import { BookCategory } from '../bookCategory/book-category-entity';

@ObjectType()
@Entity({ name: 'categories' })
export default class Category extends BaseEntity {
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

  @Type(() => Book)
  @ManyToMany(() => Book)
  @JoinTable({
    name: 'book_categories',
    joinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'bookId',
      referencedColumnName: 'id',
    },
  })
  books: Book[];

  @Type(() => BookCategory)
  @Field(() => [BookCategory])
  @OneToMany(() => BookCategory, (bookCategory) => bookCategory.categoryId)
  bookCategories: BookCategory[];
}
