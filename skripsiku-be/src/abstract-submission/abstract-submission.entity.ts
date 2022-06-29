import { AbstractSubmissionApprovalDetail } from 'src/abstract-submission-approval-detail/abstract-submission-approval-detail.entity';
import { Attachment } from 'src/attachment/attachment.entity';
import { BaseEntity } from 'src/base/base.entity';
import { SubmissionPeriod } from 'src/submission-period/submission-period.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { AbstractSubmissionApproval } from 'src/abstract-submission-approval/abstract-submission-approval.entity';

@Entity({
  name: 'abstract_submissions',
})
export class AbstractSubmission extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  title: string;

  @Column()
  status: number;

  @Column({
    nullable: true,
  })
  sequence: number;

  @ManyToOne(() => User, (user) => user.abstract_submissions, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  @OneToOne(() => Attachment, { nullable: true, eager: true })
  @JoinColumn({
    name: 'attachment',
    referencedColumnName: 'id',
  })
  attachment: Attachment;

  @ManyToOne(() => SubmissionPeriod, (submissionPeriod) => submissionPeriod.abstract_submissions, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'submission_period_id',
    referencedColumnName: 'id',
  })
  submission_period: SubmissionPeriod;

  @OneToMany(
    () => AbstractSubmissionApproval,
    (abstractSubmissionApproval) => abstractSubmissionApproval.abstract_submission
  )
  abstract_submission_approvals: AbstractSubmissionApproval[];
}
