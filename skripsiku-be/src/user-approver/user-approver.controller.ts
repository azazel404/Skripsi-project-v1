import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserApproverService } from './user-approver.service';

@Controller('user-approver')
export class UserApproverController {
  constructor(private readonly userApproverService: UserApproverService) {}

  @Post()
  create(@Body() createUserApproverDto) {
    return this.userApproverService.create(createUserApproverDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userApproverService.findOne(+id);
  }
}
