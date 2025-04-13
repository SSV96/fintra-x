import { InputType, Field } from '@nestjs/graphql';
import { AddressInput } from './address.input';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  phone: string;

  @Field(() => AddressInput, { nullable: true })
  address?: AddressInput;
}
