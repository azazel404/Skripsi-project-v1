import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import * as bcrypt from 'bcrypt';
import { Major } from 'src/major/major.entity';
import { User } from 'src/user/user.entity';
import { UserApprover } from 'src/user-approver/user-approver.entity';
import { Comment } from 'src/comment/comment.entity';
import { Attachment } from 'src/attachment/attachment.entity';
import { SubmissionApprovalDetail } from 'src/submission-approval-detail/submission-approval-detail.entity';
import { AbstractSubmissionApprovalDetail } from 'src/abstract-submission-approval-detail/abstract-submission-approval-detail.entity';
import { UserAbstractApprover } from 'src/user-abstract-approver/user-abstract-approver.entity';
import { SubmissionAttachmentApprover } from 'src/submission-attachment-approver/submission-attachment-approver.entity';

@Entity({
  name: 'lecturers',
})
export class Lecturer extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'varchar', unique: true, length: 50 })
  email: string;

  @Column({
    unique: true,
  })
  registration_number: string;

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

  @OneToOne(() => Attachment, { nullable: true, eager: true })
  @JoinColumn({
    name: 'profile_picture',
    referencedColumnName: 'id',
  })
  profile_picture: Attachment;

  @OneToMany(() => User, (user) => user.thesis_advisor_id)
  thesis_advisor_students: Promise<User[]>;

  @OneToMany(() => UserApprover, (userApprover) => userApprover.approver, { lazy: true })
  user_approvers: Promise<UserApprover[]>;

  @OneToMany(
    () => SubmissionAttachmentApprover,
    (submissionAttachmentApprover) => submissionAttachmentApprover.lecturer,
    {
      lazy: true,
    }
  )
  submission_attachment_approvers: Promise<SubmissionAttachmentApprover[]>;

  @OneToMany(() => UserAbstractApprover, (userAbstractApprover) => userAbstractApprover.lecturer, {
    lazy: true,
  })
  user_abstract_approvers: Promise<UserAbstractApprover[]>;

  @OneToMany(() => Comment, (comment) => comment.lecturer, { lazy: true })
  comments: Promise<Comment[]>;

  @OneToMany(
    () => SubmissionApprovalDetail,
    (submissionApprovalDetail) => submissionApprovalDetail.lecturer,
    { lazy: true }
  )
  submission_approval_details: Promise<SubmissionApprovalDetail[]>;

  @OneToMany(
    () => AbstractSubmissionApprovalDetail,
    (abstractSubmissionApprovalDetail) => abstractSubmissionApprovalDetail.lecturer,
    { lazy: true }
  )
  abstract_submission_approval_details: Promise<SubmissionApprovalDetail[]>;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, Number(10));
  }
}
