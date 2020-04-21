import { Controller, Get, Query } from '@nestjs/common';
import {NewsItemDto} from '@app/news/news.item.dto.ts';
import {NewsService} from '@app/news/news.service';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
  ) {}

  @Get('item')
  public getItem(
    @Query() dto: NewsItemDto,
  ) {
    return this.newsService.getItem(dto.id);
  }
}
