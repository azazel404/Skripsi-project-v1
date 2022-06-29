import { Module } from '@nestjs/common';
import { DatasourceService } from './datasource.service';
import { DatasourceController } from './datasource.controller';

@Module({
  imports: [],
  controllers: [DatasourceController],
  providers: [DatasourceService],
})
export class DatasourceModule {}
