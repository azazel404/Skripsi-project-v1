import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import * as bcrypt from 'bcrypt';
import { Major } from 'src/major/major.entity';
import { Lecturer } from 'src/lecturer/lecturer.entity';
import { UserApprover } from 'src/user-approver/user-approver.entity';
import { Submission } from 'src/submission/submission.entity';
import { Comment } from 'src/comment/comment.entity';
import { Attachment } from 'src/attachment/attachment.entity';
import { AbstractSubmission } from 'src/abstract-submission/abstract-submission.entity';
import { UserAbstractApprover } from 'src/user-abstract-approver/user-abstract-approver.entity';
import { SubmissionAttachmentApprover } from 'src/submission-attachment-approver/submission-attachment-approver.entity';
@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  first_name: string;

  @Column({
    nullable: true,
  })
  last_name: string;

  @Column({ type: 'varchar', unique: true, length: 50 })
  email: string;

  @Column({
    unique: true,
  })
  registration_number: string;

  @Column({
    nullable: true,
    default: null,
  })
  class_of: string;

  @Column()
  gender: number;

  @Column()
  password: string;

  @Column('datetime')
  birthdate: Date;

  @Column()
  phone_number: string;

  @ManyToOne(() => Major, { nullable: true, eager: true })
  @JoinColumn({
    name: 'major',
    referencedColumnName: 'id',
  })
  major: Major;

  @Column()
  role: number;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.thesis_advisor_students, {
    nullable: true,
    eager: true,
  })
  thesis_advisor_id: Lecturer;

  @OneToOne(() => Attachment, { nullable: true, eager: true })
  @JoinColumn({
    name: 'profile_picture',
    referencedColumnName: 'id',
  })
  profile_picture: Attachment;

  @OneToMany(() => UserApprover, (userApprover) => userApprover.user, { lazy: true })
  user_approvers: Promise<UserApprover[]>;

  @OneToMany(
    () => SubmissionAttachmentApprover,
    (submissionAttachmentApprover) => submissionAttachmentApprover.lecturer,
    {
      lazy: true,
    }
  )
  submission_attachment_approvers: Promise<SubmissionAttachmentApprover[]>;

  @OneToMany(() => UserAbstractApprover, (userAbstractApprover) => userAbstractApprover.user, {
    lazy: true,
  })
  user_abstract_approvers: Promise<UserAbstractApprover[]>;

  @OneToMany(() => Submission, (submission) => submission.user, { lazy: true })
  submissions: Promise<Submission[]>;

  @OneToMany(() => Comment, (comment) => comment.user, { lazy: true })
  comments: Promise<Comment[]>;

  @OneToMany(() => AbstractSubmission, (abstractSubmission) => abstractSubmission.user, {
    lazy: true,
  })
  abstract_submissions: Promise<AbstractSubmission[]>;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, Number(10));
  }
}
