import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Role from '../role/role.entity';

@ObjectType()
@Entity({ name: 'users' })
export default class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

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
  @Field(() => [Role], { nullable: true })
  @ManyToMany(() => Role, (role: Role) => role.users, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  roles: Role[];
}
