import { AbstractSubmission } from 'src/abstract-submission/abstract-submission.entity';
import { BaseEntity } from 'src/base/base.entity';
import { Major } from 'src/major/major.entity';
import { Submission } from 'src/submission/submission.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'submission_periods',
})
export class SubmissionPeriod extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  status: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  class_of: string;

  @Column({
    nullable: true,
  })
  description: string;

  @ManyToOne(() => Major, { nullable: false, eager: true })
  @JoinColumn({
    name: 'major',
    referencedColumnName: 'id',
  })
  major: Major;

  @OneToMany(() => AbstractSubmission, (abstractSubmission) => abstractSubmission.submission_period)
  abstract_submissions: AbstractSubmission[];
}
