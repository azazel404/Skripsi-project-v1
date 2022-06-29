import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'temporary_attachments',
})
export class Upload extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  file_name: string;
}
