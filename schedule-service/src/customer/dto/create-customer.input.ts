import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length, Matches, IsNotEmpty } from "class-validator";


@InputType()
export class CreateCustomerInput {
  @Field(() =>  String)
  @IsString()
  @IsNotEmpty({ message: 'Name wajib diisi' })
  @IsEmail()
  @Length(5, 100)
  name!:string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Email wajib diisi' })
  @IsEmail()
  @Length(5, 100)
  email:string='';
}
