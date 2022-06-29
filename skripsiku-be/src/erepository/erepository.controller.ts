import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  ParseIntPipe,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Attachment } from 'src/attachment/attachment.entity';
import { Exception } from 'src/base/base.exception';
import { ErepositoryService } from './erepository.service';
import { AttachmentService } from './../attachment/attachment.service';
import { Erepository } from './erepository.entity';
const fs = require('fs');
import { ERepositoryStatus } from '../../enums/ERepositoryStatus.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MajorService } from 'src/major/major.service';

@Controller('erepository')
export class ErepositoryController {
  constructor(
    private readonly erepositoryService: ErepositoryService,
    private readonly attachmentService: AttachmentService,
    private readonly majorService: MajorService
  ) {}

  @Get()
  async getAll(@Query() query, @Req() req) {
    const { page, limit, search, name, year, status, major_id, order } = query;

    let params = {
      page,
      limit,
      search,
      name,
      year,
      status,
      major_id,
      order,
    };

    let [data, count] = await this.erepositoryService.getAll(params);

    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/documents/`;

    let result = data.map((x) => {
      const { attachment, major } = x;

      let attachmentResult = {};

      if (attachment) {
        attachmentResult = {
          id: attachment.id,
          file_name: attachmentPath + attachment.file_name,
          name: attachment.file_name,
        };
      }

      return {
        ...x,
        status_in_string: ERepositoryStatus[x.status],
        attachment: attachmentResult,
        major: {
          id: major?.id,
          code: major?.code,
          name: major?.name,
        },
      };
    });

    return {
      data: result,
      count,
    };
  }

  @Get(':erepositoryId')
  async getById(@Param('erepositoryId', ParseIntPipe) eRepositoryId: number, @Req() req) {
    let data = await this.erepositoryService.getById(eRepositoryId);

    const { attachment } = data;

    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/documents/`;

    let attachmentResult = {};

    if (attachment) {
      attachmentResult = {
        id: attachment.id,
        file_name: attachmentPath + attachment.file_name,
        name: attachment.file_name,
      };
    }

    let result = {
      ...data,
      status_in_string: ERepositoryStatus[data.status],
      attachment: attachmentResult,
    };

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body) {
    const { name, description, year, publisher, file_name, status, major_id, keyword, lecturer } =
      body;

    let major = await this.majorService.findById(major_id);

    let createdNewAttachment;

    if (file_name) {
      let path = `./uploads/documents/${file_name}`;

      let pathExists = fs.existsSync(path);

      if (pathExists) {
        let oldPath = path;
        let newPath = `./uploads/documents/${file_name}`;

        fs.rename(oldPath, newPath, function (err) {
          if (err) {
            throw new Exception('Internal server error');
          }
        });

        let newAttachment = new Attachment();

        newAttachment.file_name = file_name;

        createdNewAttachment = await this.attachmentService.create(newAttachment);
      } else {
        throw new NotFoundException('File_name not found');
      }
    }

    let newERepository = new Erepository();

    newERepository.name = name;
    newERepository.description = description;
    newERepository.publisher = publisher;
    newERepository.year = year;
    newERepository.attachment = createdNewAttachment;
    newERepository.status = status;
    newERepository.major = major;
    newERepository.keyword = keyword;
    newERepository.lecturer = lecturer;

    await this.erepositoryService.create(newERepository);

    return {
      message: 'Successfully submitted repository data',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':erepositoryId')
  async update(@Body() body, @Param('erepositoryId', ParseIntPipe) eRepositoryId: number) {
    const { name, description, publisher, year, file_name, status, major_id, keyword, lecturer } =
      body;

    let erepository = await this.erepositoryService.getById(eRepositoryId);

    let oldErepositoryAttachmentId = erepository.attachment?.id;
    let oldErepositoryFileName = erepository.attachment?.file_name;

    if (name) {
      erepository.name = name;
    }
    if (description) {
      erepository.description = description;
    }
    if (publisher) {
      erepository.publisher = publisher;
    }
    if (year) {
      erepository.year = year;
    }
    if (status) {
      erepository.status = status;
    }
    if (major_id) {
      let major = await this.majorService.findById(major_id);

      erepository.major = major;
    }
    if (keyword) {
      erepository.keyword = keyword;
    }
    if (lecturer) {
      erepository.lecturer = lecturer;
    }

    let createdNewAttachment;

    if (file_name) {
      let path = `./uploads/images/${file_name}`;

      let pathExists = fs.existsSync(path);

      if (pathExists) {
        let oldPath = path;
        let newPath = `./uploads/documents/${file_name}`;

        fs.rename(oldPath, newPath, function (err) {
          if (err) {
            throw new Exception('Internal server error');
          }
        });

        let newAttachment = new Attachment();

        newAttachment.file_name = file_name;

        createdNewAttachment = await this.attachmentService.create(newAttachment);

        erepository.attachment = createdNewAttachment.id;

        await this.erepositoryService.update(erepository);

        // delete old "attachment" record from Attachment table
        await this.attachmentService.delete(oldErepositoryAttachmentId);

        // remove "attachment" file from "/uploads/documents/"
        let oldFilePath = `./uploads/documents/${oldErepositoryFileName}`;
        fs.unlinkSync(oldFilePath);

        return {
          message: 'Successfully updated E-Repository',
        };
      } else {
        throw new NotFoundException('File_name not found');
      }
    } else {
      await this.erepositoryService.update(erepository);

      return {
        message: 'Successfully updated E-Repository',
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':erepositoryId')
  async delete(@Param('erepositoryId', ParseIntPipe) eRepositoryId: number) {
    let erepository = await this.erepositoryService.getById(eRepositoryId);

    let fileNameToBeDeleted = erepository.attachment.file_name;
    let attachmentIdToBeDeleted = erepository.attachment.id;

    await this.erepositoryService.delete(eRepositoryId);

    // delete old "attachment" record for Attachment table
    await this.attachmentService.delete(attachmentIdToBeDeleted);

    // remove "attachment" file from "/uploads/documents/"
    let oldFilePath = `./uploads/documents/${fileNameToBeDeleted}`;
    fs.unlinkSync(oldFilePath);

    return {
      message: 'Successfully deleted E-Repository data',
    };
  }
}
