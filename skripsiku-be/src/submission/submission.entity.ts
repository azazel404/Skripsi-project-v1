import { SubmissionAttachment } from 'src/submission-attachment/submission-attachment.entity';
import { SubmissionPeriod } from 'src/submission-period/submission-period.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({
  name: 'submissions',
})
export class Submission extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  title: string;

  @Column()
  stage: number;

  @Column()
  status: number;

  @ManyToOne(() => User, (user) => user.submissions, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  @OneToMany(
    () => SubmissionAttachment,
    (submission_attachment) => submission_attachment.submission
  )
  submission_attachments: SubmissionAttachment[];
}
