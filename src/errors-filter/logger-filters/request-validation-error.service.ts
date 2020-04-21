import * as stringify from 'json-stringify-safe';
import { ValidationError } from 'class-validator';

import { LoggerService } from '@app/logger/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerRequestValidationErrorService {
  constructor(
    private readonly loggerService: LoggerService,
  ) {}

  async handle(err: ValidationError[]): Promise<void> {
    await this.loggerService.warning('Validation error', {
      extra: {
        validationErrors: stringify(err),
      },
    });
  }
}
