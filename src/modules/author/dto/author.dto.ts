import { InputType, Field } from 'type-graphql';

@InputType({ description: 'new author data' })
export class AddAuthorInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  phone?: string;
}

@InputType({ description: 'update author data' })
export class UpdateAuthorInput {
  @Field({ nullable: false })
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  phone?: string;
}
