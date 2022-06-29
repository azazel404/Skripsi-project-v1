import { IsNotEmpty, IsNumber } from 'class-validator';
import { Major } from 'src/major/major.entity';

export class CreateSubmissionPeriodDTO {
  @IsNotEmpty()
  start_date: Date;

  @IsNotEmpty()
  end_date: Date;

  @IsNotEmpty()
  @IsNumber()
  major_id: number;

  major: Major;

  @IsNotEmpty()
  class_of: string;

  description: string;
}
