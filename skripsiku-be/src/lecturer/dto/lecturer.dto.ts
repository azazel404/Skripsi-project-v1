import { BaseModel } from 'src/base/base.model';
import { Exclude, Expose } from 'class-transformer';

export class FindLecturerDTO {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  registration_number?: string;
  birthdate?: string;
  phone?: string;
  role?: number;
}
@Exclude()
export class LecturerDTO extends BaseModel {
  @Expose()
  email: string;

  @Expose()
  registration_number: string;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  birthdate: Date;

  @Expose()
  phone: string;

  @Expose()
  is_activated: boolean;

  @Expose()
  gender: number;
}
