import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddressInput {
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
