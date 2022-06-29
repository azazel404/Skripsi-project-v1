import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({
  name: 'majors',
})
export class Major extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  code: string;

  @Column()
  name: string;
}
