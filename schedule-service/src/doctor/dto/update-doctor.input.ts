import { CreateDoctorInput } from './create-doctor.input';
import { InputType,  PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDoctorInput extends PartialType(CreateDoctorInput) {
 
}
