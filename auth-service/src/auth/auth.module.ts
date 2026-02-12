import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret:"",
      signOptions:{expiresIn:"1h"},
    })
  ],
  providers: [AuthService, AuthResolver, JwtService],
  exports:[AuthService, AuthResolver, JwtService]
})
export class AuthModule {}
