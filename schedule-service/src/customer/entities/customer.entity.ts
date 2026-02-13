import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Customer {
  @Field(() => String, { description: 'Example field (id)' })
  id!: string;

  @Field(() => String, { description: 'Example field (id)' })
  name!: string;

  @Field(() => String, { description: 'Example field (id)' })
  email!: string;
}
