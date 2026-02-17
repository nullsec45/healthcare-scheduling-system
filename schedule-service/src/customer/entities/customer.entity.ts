import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Customer {
  @Field(() => String, { description: 'Example field (id)' })
  id!: string;

  @Field(() => String, { description: 'Example field (name)' })
  name!: string;

  @Field(() => String, { description: 'Example field (email)' })
  email!: string;
}
