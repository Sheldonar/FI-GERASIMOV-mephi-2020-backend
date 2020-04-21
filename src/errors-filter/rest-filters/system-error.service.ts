import { Response } from 'express';

import { LoggerSystemErrorService } from '@app/errors-filter/logger-filters/system-error.service';
import { ErrorsFactory } from '@app/errors-filter/dto/errors.factory';
import { StatusCodeResolverService } from '@app/system-error/status-code-resolver.service';
import { SystemError } from '@app/system-error/system-error';
import { IRestFilter } from '@app/errors-filter/rest-filters/interfaces/rest-filter.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemErrorService implements IRestFilter {
  constructor(
    private readonly defaultSystemErrorService: LoggerSystemErrorService,
    private readonly systemErrorStatusCodeResolver: StatusCodeResolverService,
    private readonly errorsDtoFactory: ErrorsFactory,
  ) {}

  async handle(err: SystemError, res: Response): Promise<void> {
    await this.defaultSystemErrorService.handle(err);

    res.status(this.systemErrorStatusCodeResolver.resolve(err.getSystemCode()));
    res.json(
      this.errorsDtoFactory.create(
        err,
        err.getSystemCode(),
        err.getMessage(),
        err.getSystemAdditionalData(),
      ).normalize(),
    );
  }
}
