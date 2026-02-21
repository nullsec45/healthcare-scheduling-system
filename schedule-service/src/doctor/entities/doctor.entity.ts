import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Doctor {
  @Field(() => String, { description: 'Example field (id)' })
  id!: string;

  @Field(() => String, { description: 'Example field (name)' })
  name!: string;
}
