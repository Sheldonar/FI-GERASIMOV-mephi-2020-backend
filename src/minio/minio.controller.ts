import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { MinioService } from '@app/minio/minio.service';

export enum Routes {
  DOWNLOAD = 'download',
}

@Controller(Routes.DOWNLOAD)
export class MinioController {
  constructor(
    private readonly minioService: MinioService,
  ) {}

  @Get(':fileName')
  public async download(
    @Res() response: Response,
    @Param('fileName') fileName: string,
  ) {
    await this.minioService.downloadFile(fileName, response);
  }
}
