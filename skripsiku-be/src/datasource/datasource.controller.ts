import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GenderDataSourceResponseModel } from './dto/datasource.dto';

@ApiTags('Data Source')
@Controller('datasource')
export class DatasourceController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Get('genders')
  async getGenderDataSource(): Promise<GenderDataSourceResponseModel[]> {
    let genderDataSource = [
      {
        id: 0,
        name: 'male',
      },
      {
        id: 1,
        name: 'female',
      },
      {
        id: 2,
        name: 'other',
      },
    ];

    return genderDataSource;
  }
}
