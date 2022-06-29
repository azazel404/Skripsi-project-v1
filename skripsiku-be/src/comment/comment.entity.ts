import { CommentSender } from 'enums/CommentSender.enum';
import { Attachment } from 'src/attachment/attachment.entity';
import { BaseEntity } from 'src/base/base.entity';
import { Lecturer } from 'src/lecturer/lecturer.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({
  name: 'comments',
})
export class Comment extends BaseEntity {
  constructor() {
    super();
  }

  @OneToOne(() => Attachment, { nullable: true, eager: true })
  @JoinColumn({
    name: 'attachment',
    referencedColumnName: 'id',
  })
  attachment: Attachment;

  @Column()
  note: string;

  @Column()
  sender: CommentSender;

  @ManyToOne(() => User, (user) => user.comments, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.comments, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'lecturer_id',
    referencedColumnName: 'id',
  })
  lecturer: Lecturer;
}
