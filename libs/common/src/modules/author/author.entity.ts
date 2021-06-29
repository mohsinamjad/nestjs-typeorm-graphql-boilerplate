import { Field, Int, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Book from '../book/book.entity';
@ObjectType()
@Entity({ name: 'authors' })
export default class Author {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associations
  @Field(() => [Book], { nullable: true })
  @OneToMany(() => Book, (book) => book.author, {
    cascade: true,
    nullable: true,
  })
  books: Book[];

  @Field(() => Int)
  virtualField: number;
}
