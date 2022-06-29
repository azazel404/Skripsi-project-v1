import { BaseEntity } from 'src/base/base.entity';
import { Lecturer } from 'src/lecturer/lecturer.entity';
import { SubmissionApproval } from 'src/submission-approval/submission-approval.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'submission_approval_details',
})
export class SubmissionApprovalDetail extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  status: number;

  @Column({
    nullable: true,
  })
  remarks: string;

  @Column({
    nullable: true,
    default: 0,
  })
  score_content: number;

  @Column({
    nullable: true,
    default: 0,
  })
  score_content_delivery: number;

  @Column({
    nullable: true,
    default: 0,
  })
  score_content_mastery: number;

  @Column({
    nullable: true,
    default: 0,
  })
  score_average: number;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.submission_approval_details, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'lecturer_id',
    referencedColumnName: 'id',
  })
  lecturer: Lecturer;

  @ManyToOne(
    () => SubmissionApproval,
    (submissionApproval) => submissionApproval.submission_approval_details,
    {
      nullable: false,
      eager: true,
    }
  )
  @JoinColumn({
    name: 'submission_approval_id',
    referencedColumnName: 'id',
  })
  submission_approval: SubmissionApproval;
}
