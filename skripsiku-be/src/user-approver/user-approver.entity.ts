import { User } from './../user/user.entity';
import { Lecturer } from 'src/lecturer/lecturer.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({
  name: 'user_approvers',
})
export class UserApprover extends BaseEntity {
  constructor() {
    super();
  }

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.user_approvers, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'approver_id',
    referencedColumnName: 'id',
  })
  approver: Lecturer;

  @ManyToOne(() => User, (user) => user.user_approvers, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  @Column({
    nullable: true,
  })
  level: number;
}
