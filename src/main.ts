import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ErrorsFilterModule} from '@app/errors-filter/errors-filter.module';
import {ErrorsFilter} from '@app/errors-filter/errors.filter';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const errorsFilter = app.select<ErrorsFilterModule>(ErrorsFilterModule).get(ErrorsFilter);

  app.useGlobalFilters(errorsFilter);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: [process.env.FRONTEND_URL],
  });

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT);
}
bootstrap();
