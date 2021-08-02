import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Book from '../book/book.entity';
import Category from '../category/category.entity';

@ObjectType()
@Entity({ name: 'book_categories' })
export class BookCategory {
  @Field()
  @Column({ nullable: true })
  isActive: boolean;

  @Column()
  @IsNotEmpty()
  @PrimaryColumn()
  bookId: number;

  @Column()
  @IsNotEmpty()
  @PrimaryColumn()
  categoryId: number;

  @Type(() => Book)
  @Field(() => Book)
  @JoinColumn({ name: 'bookId' })
  @ManyToOne(() => Book, (book) => book.bookCategories, { cascade: true })
  book: Book;

  @Type(() => Category)
  @Field(() => Category)
  @JoinColumn({ name: 'categoryId' })
  @ManyToOne(() => Category, (category) => category.bookCategories, {
    cascade: true,
  })
  category: Category;
}
