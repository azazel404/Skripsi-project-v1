import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) {}

  async create(createCommentDto) {
    return await this.commentRepository.save(createCommentDto);
  }

  async getComments(params) {
    const { page, limit, user_id, lecturer_id } = params;

    const take = limit || 10;
    const skip = (page > 0 && (page - 1) * limit) || 0;

    let query = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.attachment', 'attachment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.lecturer', 'lecturer')
      .where('comment.user_id = :user_id', { user_id })
      .andWhere('comment.lecturer_id = :lecturer_id', { lecturer_id });
    // .orderBy('attachment.created_at', 'DESC')

    if (page && limit) {
      query = query.take(take).skip(skip);
    }

    return await query.getManyAndCount();
  }

  async getHistoryComment(params) {
    const { user_id, lecturer_id } = params;

    let query = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.attachment', 'attachment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.lecturer', 'lecturer')
      .where('comment.user_id = :user_id', { user_id })
      .andWhere('comment.lecturer_id = :lecturer_id', { lecturer_id });
    // .orderBy('attachment.created_at', 'DESC')

    return await query.getManyAndCount();
  }

  async delete(commentId: number) {
    return await this.commentRepository.delete(commentId);
  }
}
