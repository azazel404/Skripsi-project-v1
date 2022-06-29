import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
  Param,
  Delete,
  UseGuards,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { MajorService } from './major.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Major } from './major.entity';
import { Exception } from 'src/base/base.exception';
@Controller('major')
export class MajorController {
  constructor(private readonly majorService: MajorService) {}

  @Get()
  async getAll(@Request() req, @Query() query) {
    const { page, limit, search } = query;

    let params = {
      page,
      limit,
      search,
    };

    let [data, count] = await this.majorService.getMajors(params);

    return {
      data: data,
      count,
    };
  }

  @Get('datasource')
  async dataSource(): Promise<Major[]> {
    let list = await this.majorService.findAll();
    return list;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() MajorDTO) {
    const major = await this.majorService.create(MajorDTO);
    return major;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.majorService.findById(id);
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Body() MajorDTO, @Request() req, @Param('id', ParseIntPipe) id: number) {
    let major = await this.majorService.findOne({
      id: id,
    });

    if (!major) {
      throw new Exception('Major ID is not valid');
    }

    let updateMajor = await this.majorService.update(MajorDTO);
    return updateMajor;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const data = await this.majorService.destroy(id);
    return data;
  }
}
