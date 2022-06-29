import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'class_ofs',
})
export class ClassOf extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  code: string;

  @Column()
  name: string;
}
