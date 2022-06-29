import { AbstractSubmissionApprovalDetail } from 'src/abstract-submission-approval-detail/abstract-submission-approval-detail.entity';
import { AbstractSubmission } from 'src/abstract-submission/abstract-submission.entity';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'abstract_submission_approvals',
})
export class AbstractSubmissionApproval extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  status: number;

  @ManyToOne(
    () => AbstractSubmission,
    (abstractSubmission) => abstractSubmission.abstract_submission_approvals,
    {
      nullable: false,
      eager: true,
    }
  )
  @JoinColumn({
    name: 'abstract_submission_id',
    referencedColumnName: 'id',
  })
  abstract_submission: AbstractSubmission;

  @OneToMany(
    () => AbstractSubmissionApprovalDetail,
    (AbstractSubmissionApprovalDetail) =>
      AbstractSubmissionApprovalDetail.abstract_submission_approval
  )
  abstract_submission_approval_details: AbstractSubmissionApprovalDetail[];
}
