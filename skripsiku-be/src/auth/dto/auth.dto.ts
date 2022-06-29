import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Gender } from 'enums/Gender.enum';

export class RegisterUserDTO {
  @ApiProperty({ name: 'email' })
  email: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  birthdate: Date;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  gender: number;

  @ApiProperty()
  registration_number: string;

  @ApiProperty()
  class_of: string;

  @ApiProperty()
  major_id: number;

  @ApiProperty()
  role_id: number;
}

export class UpdateUserDTO {
  @ApiProperty()
  id: number;

  @ApiProperty({ name: 'email' })
  email: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  birthdate: Date;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  @IsEnum(Gender, { message: 'Invalid value for Gender' })
  gender: number;

  //   @ApiProperty()
  //   class_of: string;

  @ApiProperty()
  file_name: string;
}

export class UpdatePasswordDTO {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
