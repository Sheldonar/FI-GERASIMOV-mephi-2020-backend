import { Module } from '@nestjs/common';

import { ErrorsFilter } from '@app/errors-filter/errors.filter';
import { SystemErrorModule } from '@app/system-error/system-error.module';
import { SystemErrorService } from '@app/errors-filter/rest-filters/system-error.service';
import { LoggerModule } from '@app/logger/logger.module';

import { LoggerSystemErrorService } from '@app/errors-filter/logger-filters/system-error.service';
import { LoggerDefaultService } from '@app/errors-filter/logger-filters/default.service';
import { LoggerNotFoundService } from '@app/errors-filter/logger-filters/not-found.service';
import { LoggerRequestValidationErrorService } from '@app/errors-filter/logger-filters/request-validation-error.service';
import { LoggerUniqueConstraintService } from '@app/errors-filter/logger-filters/unique-constraint.service';

import { ErrorsFactory } from '@app/errors-filter/dto/errors.factory';
import { NotFoundService } from '@app/errors-filter/rest-filters/not-found.service';
import { DefaultService } from '@app/errors-filter/rest-filters/default.service';
import { RequestValidationErrorService } from '@app/errors-filter/rest-filters/request-validation-error.service';

import { UniqueConstraintService } from '@app/errors-filter/rest-filters/unique-constraint.service';
import { ConfigModule } from '@app/config/config.module';

@Module({
  imports: [
    SystemErrorModule,
    LoggerModule,
    ConfigModule,
  ],
  providers: [
    ErrorsFilter,
    ErrorsFactory,
    LoggerSystemErrorService,
    LoggerNotFoundService,
    LoggerDefaultService,
    LoggerRequestValidationErrorService,
    LoggerUniqueConstraintService,
    SystemErrorService,
    NotFoundService,
    DefaultService,
    RequestValidationErrorService,
    UniqueConstraintService,
  ],
})
export class ErrorsFilterModule {
}
