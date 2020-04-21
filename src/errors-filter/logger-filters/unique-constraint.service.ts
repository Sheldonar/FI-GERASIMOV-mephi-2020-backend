
import * as stringify from 'json-stringify-safe';

import { LoggerService } from '@app/logger/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerUniqueConstraintService {
  constructor(
    private readonly loggerService: LoggerService,
  ) {}

  async handle(err: Error): Promise<void> {
    await this.loggerService.warning('Unique constraint alert', {
      extra: {
        error: stringify(err),
      },
    });
  }
}
