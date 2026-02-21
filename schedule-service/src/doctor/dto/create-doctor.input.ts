import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length, Matches, IsNotEmpty } from "class-validator";

@InputType()
export class CreateDoctorInput {
@Field(() =>  String)
  @IsString()
  @IsNotEmpty({ message: 'Name wajib diisi' })
  @IsEmail()
  @Length(5, 100)
  name!:string;
}
