import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class AddressInputType {
  @Field()
  street: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  postalCode: string;

  @Field()
  country: string;
}
