import { Module } from '@nestjs/common';

import { MinioService } from '@app/minio/minio.service';
import { MinioController } from '@app/minio/minio.controller';

@Module({
  controllers: [
    MinioController,
  ],
  providers: [
    MinioService,
  ],
  exports: [
    MinioService,
  ],
})
export class MinioModule {}
