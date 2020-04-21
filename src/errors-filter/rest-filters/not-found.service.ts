import { Response } from 'express';
import * as stringify from 'json-stringify-safe';

import { LoggerNotFoundService } from '@app/errors-filter/logger-filters/not-found.service';
import { ErrorsFactory } from '@app/errors-filter/dto/errors.factory';
import { StatusCodeResolverService } from '@app/system-error/status-code-resolver.service';
import { SystemErrors } from '@app/system-error/system-error';
import { IRestFilter } from '@app/errors-filter/rest-filters/interfaces/rest-filter.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotFoundService implements IRestFilter {
  constructor(
    private readonly loggerNotFoundService: LoggerNotFoundService,
    private readonly systemErrorStatusCodeResolver: StatusCodeResolverService,
    private readonly errorsDtoFactory: ErrorsFactory,
  ) {}

  async handle(err: Error, res: Response): Promise<void> {
    await this.loggerNotFoundService.handle(err);

    const dto = this.errorsDtoFactory.create(err, SystemErrors.ROUTE_NOT_FOUND, 'Not found');

    res.status(this.systemErrorStatusCodeResolver.resolve(SystemErrors.ROUTE_NOT_FOUND));
    res.setHeader('Content-Type', 'application/json');
    res.send(stringify(dto.normalize()));
  }
}
