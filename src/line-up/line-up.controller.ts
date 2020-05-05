import { Controller, Get, Query, Delete, Put } from '@nestjs/common';
import {LineUpItemDto} from '@app/line-up/line-up.item.dto.ts';
import {LineUpService} from '@app/line-up/line-up.service';
import {LineUp} from '@app/line-up/entities/line-up.entity.ts';
import { inspect } from 'util';

@Controller('lineup')
export class LineUpController {

  constructor(
    private readonly lineUpService: LineUpService,
  ) {}

  @Get()
  public async announceDj(name: string, style: string, description: string, rating: number): Promise<LineUp> {
    return await this.lineUpService.createDj(name, style, description, rating);
  }

  @Get()
  public async getAllLineUp(): Promise<LineUp[]> {
    return await this.lineUpService.getAllLineUp();
  }

  @Get()
  public async getDjByName(djName: string): Promise<LineUp> {
    return await this.lineUpService.getDjByName(djName);
  }

  // @Get()
  // public async getManeByStyle(musicStyle: string): Promise<LineUp> {
  //   return await this.lineUpService.getDjByStyle(musicStyle);
  // }

  @Put()
  public async updateDj(newName: string, oldName: string, newStyle: string, newDescription: string, newRating: number): Promise<LineUp> {
    return await this.lineUpService.updateDj(newName, oldName, newStyle, newDescription, newRating);
  }

  @Delete()
  public async deleteDj(djName: string): Promise<void> {
    await this.lineUpService.deleteDj(djName);
  }
}
