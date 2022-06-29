import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ClassOf } from './class-of.entity';
import { ClassOfService } from './class-of.service';

@Controller('class-of')
export class ClassOfController {
  constructor(private readonly classOfService: ClassOfService) {}

  @Post()
  async create(@Body() body) {
    const { code, name } = body;

    let newClassOf = new ClassOf();
    newClassOf.code = code;
    newClassOf.name = name;

    await this.classOfService.create(newClassOf);

    return {
      message: 'Successfully created Class Of data',
    };
  }

  @Get()
  async getAllClassOf(@Query() query) {
    const { page, limit } = query;

    let params = {
      page,
      limit,
    };

    let [data, count] = await this.classOfService.getAll(params);

    return {
      data,
      count,
    };
  }

  @Get(':classOfId')
  async findOne(@Param('classOfId', ParseIntPipe) classOfId: number) {
    return await this.classOfService.getById(classOfId);
  }

  @Put(':classOfId')
  async update(@Param('classOfId', ParseIntPipe) classOfId: number, @Body() body) {
    const { code, name } = body;

    let classOf = await this.classOfService.getById(classOfId);

    if (code) {
      classOf.code = code;
    }
    if (name) {
      classOf.name = name;
    }

    await this.classOfService.update(classOf);

    return {
      message: 'Successfully updated Class Of data',
    };
  }

  @Delete(':classOfId')
  async delete(@Param('classOfId', ParseIntPipe) classOfId: number) {
    await this.classOfService.remove(classOfId);

    return {
      message: 'Successfully deleted Class Of data',
    };
  }
}
