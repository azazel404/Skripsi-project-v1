import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'attachments',
})
export class Attachment extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  file_name: string;
}
