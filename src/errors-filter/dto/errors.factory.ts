import { AppEnvironment } from '@app/common/enum/app-environment';
import { ConfigService } from '@app/config/config.service';
import { ConfigNames } from '@app/config/enum/config-names';
import { SystemErrors } from '@app/system-error/system-error';
import { ErrorsDto } from '@app/errors-filter/dto/errors.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorsFactory {
  private readonly nodeEnv: AppEnvironment;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.nodeEnv = configService.get(ConfigNames.NODE_ENV) as AppEnvironment;
  }

  create(err: any, code: SystemErrors, message: string = '', data: object = {}) {
    const dto = new ErrorsDto();

    dto
      .setCode(code)
      .setError(err)
    ;

    if (this.nodeEnv === AppEnvironment.DEVELOPMENT) {
      dto
        .setData(data)
        .setMessage(message)
      ;
    }

    return dto;
  }
}
