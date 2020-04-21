import { ConfigNames } from '@app/config/enum/config-names';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    this.envConfig = process.env;
  }

  get(key: ConfigNames): string {
    return this.envConfig[key];
  }
}
