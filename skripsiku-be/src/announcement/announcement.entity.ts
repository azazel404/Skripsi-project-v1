import { Attachment } from 'src/attachment/attachment.entity';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({
  name: 'announcements',
})
export class Announcement extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  title: string;

  @Column('text')
  description: string;

  @OneToOne(() => Attachment, { nullable: true, eager: true })
  @JoinColumn({
    name: 'attachment',
    referencedColumnName: 'id',
  })
  attachment: Attachment;
}
