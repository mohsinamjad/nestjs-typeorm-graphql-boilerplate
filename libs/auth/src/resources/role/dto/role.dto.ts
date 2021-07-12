import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';
import Role from '../role.entity';

@InputType({ description: 'new role data' })
export class CreateRoleInput implements Partial<Role> {
  @IsString()
  @Field({ nullable: false })
  name: string;
}

@InputType({ description: 'update role data' })
export class UpdateRoleInput implements Partial<Role> {
  @IsInt()
  @Field({ nullable: false })
  id: number;

  @IsString()
  @Field({ nullable: false })
  name?: string;
}
