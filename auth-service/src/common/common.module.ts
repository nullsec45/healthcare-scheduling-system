import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
    imports:[      
        ConfigModule.forRoot({
            isGlobal:true
        }),
    ],
    providers:[
        PrismaService,
    
    ],
    exports:[PrismaService]
})


export class CommonModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(AuthMiddleware).forRoutes('/api/*');
    }
}