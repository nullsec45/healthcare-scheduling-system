import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { CustomerModule } from './customer/customer.module';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
     GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      
      playground: false, 
      
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    
    CustomerModule, CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
