import { Global, Module } from '@nestjs/common';

import { StatusCodeResolverService } from '@app/system-error/status-code-resolver.service';
import { SystemErrorFactory } from '@app/system-error/system-error.factory';

@Global()
@Module({
  providers: [
    StatusCodeResolverService,
    SystemErrorFactory,
  ],
  exports: [
    StatusCodeResolverService,
    SystemErrorFactory,
  ],
})
export class SystemErrorModule {}
