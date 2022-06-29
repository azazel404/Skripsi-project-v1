import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MajorService } from './major.service';
import { MajorController } from './major.controller';
import { Major } from './major.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Major])],
  providers: [MajorService],
  controllers: [MajorController],
  exports: [TypeOrmModule, MajorService],
})
export class MajorModule {}
