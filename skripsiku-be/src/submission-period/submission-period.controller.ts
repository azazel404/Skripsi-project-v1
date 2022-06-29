import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubmissionPeriodStatus } from 'enums/SubmissionPeriodStatus.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsValidMajorGuard } from 'src/is-valid-major.guard';
import { IsValidSubmissionPeriodGuard } from 'src/is-valid-submission-period.guard';
import { CreateSubmissionPeriodDTO } from './dto/submission-period.dto';
import { SubmissionPeriod } from './submission-period.entity';
import { SubmissionPeriodService } from './submission-period.service';

@Controller('submission-period')
export class SubmissionPeriodController {
  constructor(private readonly submissionPeriodService: SubmissionPeriodService) {}

  @Get()
  async getAllSubmissionPeriod(@Query() query) {
    const { page, limit, major_id, startDate, endDate, classOf, status } = query;

    let params = {
      page,
      limit,
      major_id,
      startDate,
      endDate,
      classOf,
      status,
    };

    let [result, count] = await this.submissionPeriodService.getAll(params);

    let data = result.map((x) => {
      return {
        ...x,
        status_in_string: SubmissionPeriodStatus[x.status],
      };
    });

    return {
      data,
      count,
    };
  }

  @UseGuards(JwtAuthGuard, IsValidMajorGuard)
  @Post()
  async createSubmissionPeriod(@Body() body: CreateSubmissionPeriodDTO) {
    const { start_date, end_date, major, class_of, description } = body;

    let newSubmissionPeriod = new SubmissionPeriod();
    newSubmissionPeriod.start_date = start_date;
    newSubmissionPeriod.end_date = end_date;
    newSubmissionPeriod.major = major;
    newSubmissionPeriod.class_of = class_of;
    newSubmissionPeriod.description = description;
    newSubmissionPeriod.status = SubmissionPeriodStatus.PUBLISHED;

    await this.submissionPeriodService.createSubmissionPeriod(newSubmissionPeriod);

    return {
      message: 'Successfully created Submission Period',
    };
  }

  @UseGuards(JwtAuthGuard, IsValidSubmissionPeriodGuard('params'))
  @Put(':submissionPeriodId/close')
  async closeSubmissionPeriod(@Req() req) {
    req.submissionPeriod.status = SubmissionPeriodStatus.CLOSED;

    await this.submissionPeriodService.update(req.submissionPeriod);

    return {
      message: 'Successfully closed Submission Period',
    };
  }

  @UseGuards(JwtAuthGuard, IsValidSubmissionPeriodGuard('params'))
  @Get(':submissionPeriodId')
  async getSubmissionPeriodById(@Req() req) {
    return req.submissionPeriod;
  }

  @UseGuards(JwtAuthGuard, IsValidSubmissionPeriodGuard('params'))
  @Delete(':submissionPeriodId')
  async deleteSubmissionPeriod(@Req() req) {
    await this.submissionPeriodService.delete(req.submissionPeriod.id);

    return {
      message: 'Successfully deleted Submission Period',
    };
  }
}
