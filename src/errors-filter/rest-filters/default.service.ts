import { Response } from 'express';
import { HttpStatus, Injectable } from '@nestjs/common';
import * as stringify from 'json-stringify-safe';

import { LoggerDefaultService } from '@app/errors-filter/logger-filters/default.service';
import { ErrorsFactory } from '@app/errors-filter/dto/errors.factory';
import { StatusCodeResolverService } from '@app/system-error/status-code-resolver.service';
import { SystemError, SystemErrors } from '@app/system-error/system-error';
import { IRestFilter } from '@app/errors-filter/rest-filters/interfaces/rest-filter.interface';

@Injectable()
export class DefaultService implements IRestFilter {
  constructor(
    private readonly loggerDefaultService: LoggerDefaultService,
    private readonly systemErrorStatusCodeResolver: StatusCodeResolverService,
    private readonly errorsDtoFactory: ErrorsFactory,
  ) {}

  async handle(err: SystemError, res: Response): Promise<void> {
    await this.loggerDefaultService.handle(err);

    const dto = this.errorsDtoFactory.create(err, SystemErrors.OTHER, 'Internal error');

    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.setHeader('Content-Type', 'application/json');
    res.send(stringify(dto.normalize()));
  }
}
