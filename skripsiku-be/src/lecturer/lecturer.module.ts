import { forwardRef, Module } from '@nestjs/common';
import { LecturerService } from './lecturer.service';
import { LecturerController } from './lecturer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecturer } from './lecturer.entity';
import { MajorModule } from 'src/major/major.module';
import { AuthModule } from 'src/auth/auth.module';
import { AttachmentModule } from 'src/attachment/attachment.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecturer]),
    MajorModule,
    forwardRef(() => AuthModule),
    AttachmentModule,
    forwardRef(() => UserModule),
  ],
  providers: [LecturerService],
  controllers: [LecturerController],
  exports: [LecturerService],
})
export class LecturerModule {}
