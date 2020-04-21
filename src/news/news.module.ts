import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsController } from '@app/news/news.controller';
import { News } from '@app/news/entities/news.entity';
import { NewsService } from '@app/news/news.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([News]),
  ],
  controllers: [
    NewsController,
  ],
  providers: [
    NewsService,
  ],
})
export class NewsModule {}
