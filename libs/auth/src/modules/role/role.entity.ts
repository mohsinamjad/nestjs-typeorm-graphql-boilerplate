import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '../user/user.entity';

@ObjectType()
@Entity({ name: 'roles' })
export default class Role {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associations
  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user: User) => user.roles, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  users: User[];
}
