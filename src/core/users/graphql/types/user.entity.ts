import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { description: 'username field (placeholder)' })
  username: string;
}
