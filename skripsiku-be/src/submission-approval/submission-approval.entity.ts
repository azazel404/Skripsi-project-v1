import { SubmissionApprovalDetail } from 'src/submission-approval-detail/submission-approval-detail.entity';
import { SubmissionAttachment } from 'src/submission-attachment/submission-attachment.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({
  name: 'submission_approvals',
})
export class SubmissionApproval extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  status: number;

  @Column()
  stage: number;

  @Column()
  average_score: number;

  @ManyToOne(
    () => SubmissionAttachment,
    (submission_attachment) => submission_attachment.submission_approvals,
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

  @OneToMany(
    () => SubmissionApprovalDetail,
    (submissionApprovalDetail) => submissionApprovalDetail.submission_approval,
    { lazy: true }
  )
  submission_approval_details: Promise<SubmissionApprovalDetail[]>;
}
