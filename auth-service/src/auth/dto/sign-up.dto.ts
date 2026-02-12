import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsString, Length, Matches, IsNotEmpty } from "class-validator";


@InputType()
export class SignUpInput{
    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Email wajib diisi' })
    @IsEmail()
    @Length(5, 100)
    email:string='';

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Password wajib diisi' })
    @Length(8,50, {message:'Password minimal 8 karakter dan maksimal 50 karakter'})
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/,
    {
        message:'Password harus mengandung kombinasi huruf dan angka.',
    })
    password:string='';
}

