import { SystemError, SystemErrors } from '@app/system-error/system-error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemErrorFactory {
  public create(systemErrorCode: SystemErrors, message: string = '', data: object = {}): SystemError {
    const systemError = new SystemError(message);

    systemError.setSystemCode(systemErrorCode);
    systemError.setSystemAdditionalData(data);

    return systemError;
  }
}
