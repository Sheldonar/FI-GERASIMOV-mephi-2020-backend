import * as stringify from 'json-stringify-safe';
import { Response } from 'express';

import { LoggerUniqueConstraintService } from '@app/errors-filter/logger-filters/unique-constraint.service';
import { ErrorsFactory } from '@app/errors-filter/dto/errors.factory';
import { StatusCodeResolverService } from '@app/system-error/status-code-resolver.service';
import { SystemErrors } from '@app/system-error/system-error';
import { LoggerService } from '@app/logger/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UniqueConstraintService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly loggerUniqueConstraint: LoggerUniqueConstraintService,
    private readonly errorsFactory: ErrorsFactory,
    private readonly systemErrorStatusCodeResolver: StatusCodeResolverService,
  ) {
  }

  public async handle(err: Error, res: Response): Promise<void> {
    await this.loggerUniqueConstraint.handle(err);

    const dto = this.errorsFactory.create(
      err,
      SystemErrors.UNIQUE_CONSTRAINT_ALERT,
      'Database unique constraint has occurred.',
    );

    res.setHeader('Content-Type', 'application/json');

    res
      .status(this.systemErrorStatusCodeResolver.resolve(SystemErrors.UNIQUE_CONSTRAINT_ALERT))
      .send(stringify(dto.normalize()))
    ;
  }
}
