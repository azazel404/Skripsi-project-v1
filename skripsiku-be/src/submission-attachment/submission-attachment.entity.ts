import { Attachment } from 'src/attachment/attachment.entity';
import { Stage } from 'src/stage/stage.entity';
import { SubmissionApproval } from 'src/submission-approval/submission-approval.entity';
import { SubmissionAttachmentApprover } from 'src/submission-attachment-approver/submission-attachment-approver.entity';
import { Submission } from 'src/submission/submission.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({
  name: 'submission_attachments',
})
export class SubmissionAttachment extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  status: number;

  @Column()
  stage: number;

  @ManyToOne(() => Submission, (submission) => submission.submission_attachments, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'submission_id',
    referencedColumnName: 'id',
  })
  submission: Submission;

  @OneToOne(() => Attachment, { nullable: true, eager: true })
  @JoinColumn({
    name: 'attachment',
    referencedColumnName: 'id',
  })
  attachment: Attachment;

  @Column({
    nullable: true,
  })
  date: Date;

  @Column({
    nullable: true,
  })
  start_time: string;

  @Column({
    nullable: true,
  })
  end_time: string;

  @Column({
    nullable: true,
  })
  location: string;

  @OneToMany(
    () => SubmissionApproval,
    (submissionApproval) => submissionApproval.submission_attachment
  )
  submission_approvals: SubmissionApproval[];

  @OneToMany(
    () => SubmissionAttachmentApprover,
    (submissionAttachmentApprover) => submissionAttachmentApprover.lecturer,
    {
      lazy: true,
    }
  )
  submission_attachment_approvers: Promise<SubmissionAttachmentApprover[]>;
}
