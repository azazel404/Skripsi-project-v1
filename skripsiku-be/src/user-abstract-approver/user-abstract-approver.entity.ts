import { BaseEntity } from 'src/base/base.entity';
import { Lecturer } from 'src/lecturer/lecturer.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'user_abstract_approvers',
})
export class UserAbstractApprover extends BaseEntity {
  constructor() {
    super();
  }

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.user_abstract_approvers, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'lecturer_id',
    referencedColumnName: 'id',
  })
  lecturer: Lecturer;

  @ManyToOne(() => User, (user) => user.user_abstract_approvers, {
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
