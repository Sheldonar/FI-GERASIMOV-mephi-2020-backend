import { LoggerService } from '@app/logger/logger.service';
import { SystemError } from '@app/system-error/system-error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerSystemErrorService {
  constructor(
    private readonly loggerService: LoggerService,
  ) {}

  async handle(err: SystemError): Promise<void> {
    await this.loggerService.notice('System error has been occurred', {
      extra: {
        systemError: {
          code: err.getSystemCode(),
          message: err.getMessage(),
          additionalData: err.getSystemAdditionalData(),
        },
      },
    });
  }
}
