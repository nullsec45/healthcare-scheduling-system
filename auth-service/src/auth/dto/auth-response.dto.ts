import { ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
import { User } from "../user.model";

@ObjectType()
export class AuthResponse {
    @Field()
    token_valid!:boolean;

    @Field(() => User)
    user!:User;
} 