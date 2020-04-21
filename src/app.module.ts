import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LoggerMiddleware} from '@app/logger/logger.middleware';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as Transport from 'winston-transport';
import { WinstonModule } from 'nest-winston';
import {AppEnvironment} from '@app/common/enum/app-environment';
import {format, transports} from 'winston';
import {Routes} from '@app/minio/minio.controller';
import {LoggerModule} from '@app/logger/logger.module';
import {ErrorsFilterModule} from '@app/errors-filter/errors-filter.module';
import {ConfigModule} from '@app/config/config.module';
import {NewsModule} from '@app/news/news.module';

const loggerTransports: Transport[] = [
  new DailyRotateFile({
    filename: 'cc-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '7d',
    dirname: process.env.LOGS_PATH,
  }),
];

if (process.env.NODE_ENV === AppEnvironment.DEVELOPMENT) {
  loggerTransports.push(new transports.Console());
}

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    WinstonModule.forRoot({
      format: format.printf(info => info.message),
      transports: loggerTransports,
    }),
    LoggerModule,
    ErrorsFilterModule,
    ConfigModule,
    NewsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(Routes.DOWNLOAD)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
