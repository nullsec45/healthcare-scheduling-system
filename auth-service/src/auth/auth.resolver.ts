import { Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Query, Mutation } from '@nestjs/graphql';
import { User } from './user.model';
import { AuthResponse } from './dto/auth-response.dto';
import { Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlJWTGuard } from './gql-guard';
import { SignUpInput } from './dto/sign-up.dto';
import { SignInInput } from './dto/sign-in.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { ResponseDataDto } from 'src/dto/response.dto';
// import { AuthenticatedGuard } from './authenticated.guard';
// import { JwtAuthGuard } from './jwt-auth.guard';


@Resolver()
export class AuthResolver {
    constructor(private readonly authService:AuthService) {

    }

    @Mutation(() => ResponseDataDto)
    register(@Args('data') data: SignUpInput) {
        return this.authService.register(data);
    }

    @Mutation(() => ResponseDataDto)
    login(@Args('data') data: SignInInput) {
        return this.authService.login(data);
    }

    @UseGuards(GqlJWTGuard)
    @Query(() => User)
    validateToken(@CurrentUser() user: User) {
        return user;
    }
}
