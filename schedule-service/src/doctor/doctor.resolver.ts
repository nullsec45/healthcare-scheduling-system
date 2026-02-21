import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DoctorService } from './doctor.service';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { UpdateDoctorInput } from './dto/update-doctor.input';
import { ResponseDataDto } from 'src/dto/response.dto';

@Resolver(() => Doctor)
export class DoctorResolver {
  constructor(private readonly doctorService: DoctorService) {}

  @Mutation(() => ResponseDataDto, { name : 'createDoctor'})
  async createDoctor(@Args('createDoctorInput') createDoctorInput: CreateDoctorInput) : Promise<ResponseDataDto> {
    return  await this.doctorService.create(createDoctorInput);
  }

  @Query(() => ResponseDataDto, { name: 'findAllDoctor' })
  async findAll() : Promise<ResponseDataDto> {
    return await this.doctorService.findAll();
  }

  @Query(() => ResponseDataDto, { name: 'findOneDoctor' })
  async findOne(@Args('id', { type: () => String }) id: string) : Promise<ResponseDataDto> {
    return await this.doctorService.findOne(id);
  }

  @Mutation(() => ResponseDataDto, { name : 'updateDoctor'})
  async updateDoctor(
    @Args('id', { type: () => String }) id: string,
    @Args('updateDoctorInput') updateDoctorInput: UpdateDoctorInput
  ) : Promise<ResponseDataDto> {
    return await this.doctorService.update(id, updateDoctorInput);
  }

  @Mutation(() => ResponseDataDto, { name:'removeDoctor' })
  async removeDoctor(@Args('id', { type: () => String }) id: string) : Promise<ResponseDataDto> {
    return await this.doctorService.remove(id);
  }
}
