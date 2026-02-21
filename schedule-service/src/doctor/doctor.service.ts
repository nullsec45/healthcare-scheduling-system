import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { UpdateDoctorInput } from './dto/update-doctor.input';
import { PrismaService } from 'src/common/prisma.service';
import { ResponseData } from 'src/types/response';
import { responseValue, responseValueWithData } from '../utils/response';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
   private readonly prismaService:PrismaService
  ){

  }

  async checkDoctorMustExists (id) : Promise<Doctor | null>  {
      const doctor = await this.prismaService.doctor.findUnique({
        select:{
          id:true,
          name:true,
        },
        where: { id },
      });

      return doctor;
  }

  async create(createDoctorInput: CreateDoctorInput) :  Promise<ResponseData>  {
    try{
      const doctor=await this.prismaService.doctor.create({
        data:createDoctorInput,
      });

      return responseValueWithData(
            true,
            HttpStatus.CREATED,
            'Doctor created successfully',
            doctor,
        );
    }catch(error:any){
      return responseValue(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ?? 'Internal server error.',
      );
    }
  }

  async findAll() : Promise<ResponseData> {
    try{
      const doctors = await this.prismaService.doctor.findMany();
      
      return responseValueWithData(
        true,
        HttpStatus.OK,
        'Doctors retrieved successfully',
        doctors,
      );
    }catch(error:any){
      return responseValue(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ?? 'Internal server error.',
      );
    }
  }

  async findOne(id: string) : Promise<ResponseData> {
    try{
      const doctor=await this.checkDoctorMustExists(id);

      if (!doctor) {
        return responseValue(false, HttpStatus.NOT_FOUND, 'Doctor not found');
      }

      return responseValueWithData(
        true,
        HttpStatus.OK,
        'Doctor found',
        doctor,
      );
    }catch(error:any){
      return responseValue(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ?? 'Internal server error.',
      );
    }
  }

  async update(id: string, updateDoctorInput: UpdateDoctorInput) : Promise<ResponseData> {
    try{
      const doctor=await this.checkDoctorMustExists(id);

      if (!doctor) {
        return responseValue(false, HttpStatus.NOT_FOUND, 'Doctor not found');
      }

      const updatedDoctor = await this.prismaService.doctor.update({
        where: { id },
        data: updateDoctorInput,
      });

      return responseValueWithData(
        true,
        HttpStatus.OK,
        'Doctor updated successfully',
        updatedDoctor,
      );
    }catch(error:any){
      return responseValue(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ?? 'Internal server error.',
      );
    }
  }

  async remove(id: string) : Promise<ResponseData> {
    try{
      const doctor=await this.checkDoctorMustExists(id);

      if (!doctor) {
        return responseValue(false, HttpStatus.NOT_FOUND, 'Doctor not found');
      }


      await this.prismaService.customer.delete({
        where: { id },
      });

      return responseValue(true, HttpStatus.OK, 'Doctor deleted successfully');
    }catch(error:any){
      return responseValue(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ?? 'Internal server error.',
      );
    }
  }
}
