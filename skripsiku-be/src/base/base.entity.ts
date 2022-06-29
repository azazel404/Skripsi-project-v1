import {
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
