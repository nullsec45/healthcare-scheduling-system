import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field(() => Int)
  id!: string;

  @Field(() =>  String)
  name!:string;

  @Field(() => String)
  email!:string;
}
