import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars'; // Opsional jika ingin data bebas

@ObjectType()
export class ResponseDataDto {
  @Field()
  status!: boolean;

  @Field(() => Int)
  statusCode!: number;

  @Field()
  message!: string;

  // Menggunakan JSON object jika datanya dinamis
  @Field(() => GraphQLJSONObject, { nullable: true })
  data?: any;
}

@ObjectType()
export class PaginationMetaDto {
  @Field(() => Int)
  page!: number;

  @Field(() => Int)
  perPage!: number;

  @Field(() => Int)
  totalPages!: number;

  @Field(() => Int)
  totalItems!: number;

  @Field(() => [GraphQLJSONObject]) 
  items!: any[];
}

@ObjectType()
export class ResponseDataPaginateDto {
  @Field()
  status!: boolean;

  @Field(() => Int)
  statusCode!: number;

  @Field()
  message!: string;

  @Field(() => PaginationMetaDto, { nullable: true })
  data?: PaginationMetaDto;
}