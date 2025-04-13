import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AddressInputType } from './address.type';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  emailVerifiedAt?: boolean;

  @Field({ nullable: true })
  phoneVerifiedAt?: boolean;

  @Field(() => AddressInputType, { nullable: true })
  address?: AddressInputType;
}
