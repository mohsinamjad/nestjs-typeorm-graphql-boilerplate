import { InputType, Field } from '@nestjs/graphql';
import User from '../user.entity';
import { IsString, IsInt, IsOptional, IsEmail } from 'class-validator';
import Role from '../../role/role.entity';
import { CreateRoleInput } from '../../role/dto/role.dto';

@InputType({ description: 'new user data' })
export class CreateUserInput implements Partial<User> {
  @IsString()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  phone?: string;

  @IsOptional()
  @Field(() => [CreateRoleInput], { nullable: true })
  roles?: Role[];
}

@InputType({ description: 'update user data' })
export class UpdateUserInput implements Partial<User> {
  @IsInt()
  @Field({ nullable: false })
  id: number;

  @IsString()
  @Field({ nullable: true })
  name?: string;

  @IsEmail()
  @Field({ nullable: true })
  email?: string;

  @IsString()
  @Field({ nullable: true })
  phone?: string;
}

@InputType({ description: 'new user data' })
export class loginInput implements Partial<User> {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;
}
