import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignUpInput } from './dto/sign-up.dto';
import { SignInInput } from './dto/sign-in.dto';
import { UnauthorizedException } from '@nestjs/common';
import { ResponseData } from 'src/types/response';
import {responseValue, responseValueWithData} from '../utils/response';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly jwtService:JwtService,
    ){}

    async register(data:SignUpInput):Promise<ResponseData>{
        try{
            const hashedPassword = await bcrypt.hash(data.password, 10);
            
            await this.prismaService.user.create({
                data: { ...data, password: hashedPassword },
            });
            
            return responseValue(true, HttpStatus.CREATED, 'Successfully register');
        }catch(error:any){
            if (error.code === 'P2002') {
                return responseValue(
                false,
                HttpStatus.CONFLICT,
                'Email already registered'
                );
            }

            return responseValue(false, HttpStatus.INTERNAL_SERVER_ERROR, error.message ?? 'Internal server error.');
        }
    }

    async login(data: SignInInput):Promise<ResponseData> {
        try{
            const user = await this.prismaService.user.findUnique(
                { where: { email: data.email } 
            });


            if (!user || !(await bcrypt.compare(data.password, user.password))) {
                return responseValue(true, HttpStatus.UNAUTHORIZED, 'Email or password is invalid');
            }

            let payload={id:user.id}
            
            let accessToken=this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: "1h"
            });

            const expiry = new Date(Date.now() + 60 * 60 * 1000);
            const fmt = new Intl.DateTimeFormat('sv-SE', {
                timeZone: 'Asia/Jakarta',
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: false,
            });
        
            const jakarta = fmt.format(expiry).replace(' ', 'T');
            const tokenExpiredAt = `${jakarta}+07:00`;

            return responseValueWithData(true,HttpStatus.OK, 'Successfully Login.', {
                accessToken:accessToken,
                tokenExpiredAt:tokenExpiredAt,
            });
        }catch(error:any) {
             return responseValue(false, HttpStatus.INTERNAL_SERVER_ERROR, error.message ?? 'Internal server error.');
        }

    }

    async findFirst(id:string){
        try {
            return await this.prismaService.user.findFirst(
                {
                    where:{
                        id: { equals: id ?? '' }
                    }
                });
        } catch (e) {
            return null;
        }
    }
   
}
