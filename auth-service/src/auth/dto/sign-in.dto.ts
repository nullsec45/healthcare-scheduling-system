import { SignUpInput } from "./sign-up.dto";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SignInInput extends SignUpInput {}