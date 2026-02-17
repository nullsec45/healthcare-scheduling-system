import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity'; 
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { ResponseDataDto } from 'src/dto/response.dto';
@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation(() => ResponseDataDto, { name: 'createCustomer' })
  async createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ): Promise<ResponseDataDto> {
    return await this.customerService.create(createCustomerInput);
  }

  @Query(() => ResponseDataDto, { name: 'findAllCustomer' })
  async findAll(): Promise<ResponseDataDto> {
    return await this.customerService.findAll();
  }

  @Query(() => ResponseDataDto, { name: 'findOneCustomer' })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<ResponseDataDto> {
    return await this.customerService.findOne(id);
  }

  @Mutation(() => ResponseDataDto, { name: 'updateCustomer' })
  async updateCustomer(
    @Args('id', { type: () => String }) id: string,
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ): Promise<ResponseDataDto> {
    return await this.customerService.update(id, updateCustomerInput);
  }

  @Mutation(() => ResponseDataDto, { name: 'removeCustomer' })
    async removeCustomer(@Args('id', { type: () => String }) id: string): Promise<ResponseDataDto> {
      return await this.customerService.remove(id);
    }
}