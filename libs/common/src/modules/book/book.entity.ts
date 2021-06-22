import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import Author from '../author/author.entity';
import { Field, ObjectType } from 'type-graphql';

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

  @Field()
  @Column({ name: 'author_id' })
  authorId: number;
  @ManyToOne(() => Author, (author) => author.books, { primary: true })
  @JoinColumn({ name: 'author_id' })
  author: Promise<Author>;
}
