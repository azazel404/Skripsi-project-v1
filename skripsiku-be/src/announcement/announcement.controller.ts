import {
  Controller,
  Post,
  Body,
  UseGuards,
  InternalServerErrorException,
  NotFoundException,
  Put,
  Req,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { Attachment } from 'src/attachment/attachment.entity';
import { AttachmentService } from 'src/attachment/attachment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AnnouncementService } from './announcement.service';
import { Announcement } from './announcement.entity';
import { IsValidAnnouncementGuard } from 'src/is-valid-announcement.guard';
import { Exception } from 'src/base/base.exception';
const fs = require('fs');

@UseGuards(JwtAuthGuard)
@Controller('announcement')
export class AnnouncementController {
  constructor(
    private readonly announcementService: AnnouncementService,
    private readonly attachmentService: AttachmentService
  ) {}

  @UseGuards(IsValidAnnouncementGuard('params'))
  @Get(':announcementId')
  async getById(@Req() req) {
    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/documents/`;

    req.announcement.attachment = {
      id: req.announcement.attachment?.id,
      document: req.announcement.attachment?.file_name,
      file_name: attachmentPath + req.announcement.attachment?.file_name,
    };

    return req.announcement;
  }

  @Get()
  async getAll(@Query() query, @Req() req) {
    const { page, limit } = query;

    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/documents/`;

    let params = {
      page,
      limit,
    };

    let [data, count] = await this.announcementService.getAll(params);

    let result = data.map((x) => {
      return {
        ...x,
        attachment: {
          id: x.attachment?.id,
          file_name : x.attachment?.file_name,
          file_path: attachmentPath + x.attachment?.file_name,
        },
      };
    });

    return {
      data: result,
      count,
    };
  }

  @Post()
  async create(@Body() body) {
    const { title, description, file_name } = body;

    let createdNewAttachment = null;

    if (file_name) {
      let path = `./uploads/documents/${file_name}`;

      let pathExists = fs.existsSync(path);

      if (pathExists) {
        let oldPath = path;
        let newPath = `./uploads/documents/${file_name}`;

        fs.rename(oldPath, newPath, function (err) {
          if (err) {
            throw new InternalServerErrorException();
          }
        });

        let newAttachment = new Attachment();

        newAttachment.file_name = file_name;

        createdNewAttachment = await this.attachmentService.create(newAttachment);
      } else {
        throw new NotFoundException('File_name not found');
      }
    }

    let newAnnouncement = new Announcement();
    newAnnouncement.title = title;
    newAnnouncement.description = description;
    newAnnouncement.attachment = createdNewAttachment;

    await this.announcementService.create(newAnnouncement);

    return {
      message: 'Successfully created Announcement',
    };
  }

  @UseGuards(IsValidAnnouncementGuard('params'))
  @Put(':announcementId')
  async update(@Body() body, @Req() req) {
    const { title, description, file_name } = body;

    req.announcement.title = title;
    req.announcement.description = description;

    let oldAttachmentId = req.announcement.attachment?.id;
    let oldAttachmentFileName = req.announcement.attachment?.file_name;

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

        req.announcement.attachment = createdNewAttachment;

        await this.announcementService.update(req.announcement);

        // delete old "attachment" record from Attachment table
        await this.attachmentService.delete(oldAttachmentId);

        // remote "attachment" file from "/uploads/documents"
        let oldFilePath = `./uploads/documents/${oldAttachmentFileName}`;
        fs.unlinkSync(oldFilePath);

        return {
          message: 'Successfully updated Announcement',
        };
      } else {
        throw new NotFoundException('File_name not found');
      }
    }

    await this.announcementService.update(req.announcement);

    return {
      message: 'Successfully updated Announcement',
    };
  }

  @UseGuards(IsValidAnnouncementGuard('params'))
  @Delete(':announcementId')
  async delete(@Req() req) {
    await this.announcementService.delete(req.announcement.id);

    return {
      message: 'Successfully deleted Announcement',
    };
  }
}
