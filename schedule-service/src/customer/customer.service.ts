import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { PrismaService } from 'src/common/prisma.service';
import { ResponseData } from 'src/types/response';
import { responseValue, responseValueWithData } from '../utils/response';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCustomerInput: CreateCustomerInput): Promise<ResponseData> {
    try {
      const customer = await this.prismaService.customer.create({
        data: createCustomerInput,
      });

      return responseValueWithData(
        true,
        HttpStatus.CREATED,
        'Customer created successfully',
        customer,
      );
    } catch (error: any) {
      if (error.code === 'P2002') {
        return responseValue(
          false,
          HttpStatus.CONFLICT,
          'Email already registered',
        );
      }

      return responseValue(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ?? 'Internal server error.',
      );
    }
  }

  async findAll(): Promise<ResponseData> {
    try {
      const customers = await this.prismaService.customer.findMany();
      
      return responseValueWithData(
        true,
        HttpStatus.OK,
        'Customers retrieved successfully',
        customers,
      );
    } catch (error: any) {
      return responseValue(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ?? 'Internal server error.',
      );
    }
  }

  async findOne(id: string): Promise<ResponseData> {
    try {
      const customer = await this.prismaService.customer.findUnique({
        where: { id },
      });

      if (!customer) {
        return responseValue(false, HttpStatus.NOT_FOUND, 'Customer not found');
      }

      return responseValueWithData(
        true,
        HttpStatus.OK,
        'Customer found',
        customer,
      );
    } catch (error: any) {
      return responseValue(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ?? 'Internal server error.',
      );
    }
  }

  async update(id: string, updateCustomerInput: UpdateCustomerInput): Promise<ResponseData> {
    try {
      const check = await this.prismaService.customer.findUnique({ where: { id } });
      if (!check) {
        return responseValue(false, HttpStatus.NOT_FOUND, 'Customer not found');
      }

      const updatedCustomer = await this.prismaService.customer.update({
        where: { id },
        data: updateCustomerInput,
      });

      return responseValueWithData(
        true,
        HttpStatus.OK,
        'Customer updated successfully',
        updatedCustomer,
      );
    } catch (error: any) {
      return responseValue(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ?? 'Internal server error.',
      );
    }
  }

  async remove(id: string): Promise<ResponseData> {
    try {
      const check = await this.prismaService.customer.findUnique({ where: { id } });
      if (!check) {
        return responseValue(false, HttpStatus.NOT_FOUND, 'Customer not found');
      }

      await this.prismaService.customer.delete({
        where: { id },
      });

      return responseValue(true, HttpStatus.OK, 'Customer deleted successfully');
    } catch (error: any) {
      return responseValue(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ?? 'Internal server error.',
      );
    }
  }
}