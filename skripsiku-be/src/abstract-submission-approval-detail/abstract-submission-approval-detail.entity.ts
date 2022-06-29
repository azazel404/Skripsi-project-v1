import { AbstractSubmissionApproval } from 'src/abstract-submission-approval/abstract-submission-approval.entity';
import { BaseEntity } from 'src/base/base.entity';
import { Lecturer } from 'src/lecturer/lecturer.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'abstract_submission_approval_details',
})
export class AbstractSubmissionApprovalDetail extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  status: number;

  @Column('text', {
    nullable: true,
  })
  remarks: string;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.comments, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'lecturer_id',
    referencedColumnName: 'id',
  })
  lecturer: Lecturer;

  @ManyToOne(
    () => AbstractSubmissionApproval,
    (abstractSubmissionApproval) => abstractSubmissionApproval.abstract_submission_approval_details,
    {
      nullable: false,
      eager: true,
    }
  )
  @JoinColumn({
    name: 'abstract_submission_approval_id',
    referencedColumnName: 'id',
  })
  abstract_submission_approval: AbstractSubmissionApproval;
}
