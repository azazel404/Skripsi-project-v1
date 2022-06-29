import { Lecturer } from 'src/lecturer/lecturer.entity';
import { SubmissionAttachment } from 'src/submission-attachment/submission-attachment.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({
  name: 'submission_attachment_approvers',
})
export class SubmissionAttachmentApprover extends BaseEntity {
  constructor() {
    super();
  }

  @Column({
    nullable: true,
  })
  level: number;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.submission_attachment_approvers, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'lecturer_id',
    referencedColumnName: 'id',
  })
  lecturer: Lecturer;

  @ManyToOne(() => User, (user) => user.submission_attachment_approvers, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  @ManyToOne(
    () => SubmissionAttachment,
    (submissionAttachment) => submissionAttachment.submission_attachment_approvers,
    {
      nullable: false,
      eager: true,
    }
  )
  @JoinColumn({
    name: 'submission_attachment_id',
    referencedColumnName: 'id',
  })
  submission_attachment: SubmissionAttachment;
}
