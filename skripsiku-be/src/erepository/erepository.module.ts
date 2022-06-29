import { Module } from '@nestjs/common';
import { ErepositoryService } from './erepository.service';
import { ErepositoryController } from './erepository.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Erepository } from './erepository.entity';
import { AttachmentModule } from 'src/attachment/attachment.module';
import { UserModule } from 'src/user/user.module';
import { MajorModule } from 'src/major/major.module';

@Module({
  imports: [TypeOrmModule.forFeature([Erepository]), AttachmentModule, UserModule, MajorModule],
  providers: [ErepositoryService],
  controllers: [ErepositoryController],
  exports: [ErepositoryService],
})
export class ErepositoryModule {}
