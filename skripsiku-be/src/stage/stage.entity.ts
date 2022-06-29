import { SubmissionAttachment } from 'src/submission-attachment/submission-attachment.entity';
import { Submission } from 'src/submission/submission.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { SubmissionApproval } from './../submission-approval/submission-approval.entity';

@Entity({
  name: 'stages',
})
export class Stage extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => Submission, (submission) => submission.stage)
  submissions: Submission[];

  @OneToMany(() => SubmissionAttachment, (submissionAttachment) => submissionAttachment.stage)
  submission_attachments: SubmissionAttachment[];

  @OneToMany(() => SubmissionApproval, (submissionApproval) => submissionApproval.stage)
  submission_approvals: SubmissionApproval[];
}
