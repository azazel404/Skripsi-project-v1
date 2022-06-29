import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmissionAttachment } from './submission-attachment.entity';

@Injectable()
export class SubmissionAttachmentService {
  constructor(
    @InjectRepository(SubmissionAttachment)
    private submissionAttachmentRepository: Repository<SubmissionAttachment>
  ) {}

  async create(body) {
    return await this.submissionAttachmentRepository.save(body);
  }

  async update(body) {
    return await this.submissionAttachmentRepository.save(body);
  }

  async findById(id: number) {
    let submissionAttachment = await this.submissionAttachmentRepository.findOne(id);

    if (!submissionAttachment) {
      throw new NotFoundException('Submission Attachment data not found');
    }

    return submissionAttachment;
  }

  async getLatestStageBySubmissionId(id: number) {
    let data = await this.submissionAttachmentRepository.find({
      where: {
        submission: id,
      },
    });

    let stages = data.map((x) => x.stage);

    let max = Math.max(...[...stages]);

    return max;
  }

  async getList(params) {
    const { page, limit, stage, submission_id, user_id } = params;

    const take = limit || 10;
    const skip = (page > 0 && (page - 1) * limit) || 0;

    if (page && limit) {
      let query = await this.submissionAttachmentRepository
        .createQueryBuilder('submissionAttachment')
        .leftJoinAndSelect('submissionAttachment.attachment', 'attachment')
        .leftJoinAndSelect('submissionAttachment.submission', 'submission')
        .leftJoinAndSelect('submission.user', 'user')
        .take(take)
        .skip(skip);

      if (submission_id) {
        query = query.andWhere('submission.id = :submission_id', { submission_id });
      }

      if (stage) {
        query = query.andWhere('submissionAttachment.stage = :stage', { stage });
      }

      if (user_id) {
        query = query.andWhere('user.id = :user_id', { user_id });
      }

      return await query.getManyAndCount();
    } else {
      return await this.submissionAttachmentRepository.findAndCount({
        where: {
          submission: submission_id,
          stage,
        },
      });
    }
  }

  async getThesisAdvisorBySubmissionAttachmentId(submissionAttachmentId: number) {
    let submissionAttachment = await this.findById(submissionAttachmentId);

    let submission = submissionAttachment.submission;
    let user = submission.user;

    return user.thesis_advisor_id ? user.thesis_advisor_id : null;
  }
}
