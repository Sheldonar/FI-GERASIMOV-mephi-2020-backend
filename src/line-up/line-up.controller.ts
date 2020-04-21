import { Controller, Get, Query } from '@nestjs/common';
import {LineUpItemDto} from '@app/line-up/line-up.item.dto.ts';
import {LineUpService} from '@app/line-up/line-up.service';
import {LineUp} from '@app/line-up/entities/line-up.entity.ts';

@Controller('news')
export class NewsController {
  constructor(
    private readonly lineUpService: LineUpService,
  ) {}

  @Get('item')
  public getItem(
    @Query() dto: LineUpItemDto,
  ) {
    return this.lineUpService.getItem(dto.id);
  }
}
