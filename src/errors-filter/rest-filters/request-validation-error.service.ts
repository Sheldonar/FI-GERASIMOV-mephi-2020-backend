import { Response } from 'express';
import { Inject, Injectable } from '@nestjs/common';
import * as stringify from 'json-stringify-safe';
import { ValidationError } from 'class-validator';

import { LoggerRequestValidationErrorService } from '@app/errors-filter/logger-filters/request-validation-error.service';
import { ErrorsFactory } from '@app/errors-filter/dto/errors.factory';
import { StatusCodeResolverService } from '@app/system-error/status-code-resolver.service';
import { SystemErrors } from '@app/system-error/system-error';
import { IRestFilter } from '@app/errors-filter/rest-filters/interfaces/rest-filter.interface';

@Injectable()
export class RequestValidationErrorService implements IRestFilter {
  constructor(
    private readonly loggerRequestValidationErrorService: LoggerRequestValidationErrorService,
    private readonly systemErrorStatusCodeResolver: StatusCodeResolverService,
    private readonly errorsDtoFactory: ErrorsFactory,
  ) {}

  async handle(err: ValidationError[], res: Response): Promise<void> {
    await this.loggerRequestValidationErrorService.handle(err);

    const dto = this.errorsDtoFactory.create(err, SystemErrors.REST_VALIDATION_ERROR, 'Not found');

    res.status(this.systemErrorStatusCodeResolver.resolve(SystemErrors.REST_VALIDATION_ERROR));
    res.setHeader('Content-Type', 'application/json');
    res.send(stringify(dto.normalize()));
  }
}
