import { Module } from '@nestjs/common';
import { ClassOfService } from './class-of.service';
import { ClassOfController } from './class-of.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassOf } from './class-of.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassOf])],
  providers: [ClassOfService],
  controllers: [ClassOfController],
  exports: [TypeOrmModule],
})
export class ClassOfModule {}
