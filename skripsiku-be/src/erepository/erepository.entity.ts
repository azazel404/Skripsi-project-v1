import { Attachment } from 'src/attachment/attachment.entity';
import { Major } from 'src/major/major.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({
  name: 'erepositories',
})
export class Erepository extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  keyword: string;

  @Column()
  year: number;

  @Column()
  publisher: string;

  @Column()
  lecturer: string;

  @Column()
  status: number;

  @OneToOne(() => Attachment, { nullable: true, eager: true })
  @JoinColumn({
    name: 'attachment',
    referencedColumnName: 'id',
  })
  attachment: Attachment;

  @ManyToOne(() => Major, { nullable: true, eager: true })
  @JoinColumn({
    name: 'major',
    referencedColumnName: 'id',
  })
  major: Major;
}
