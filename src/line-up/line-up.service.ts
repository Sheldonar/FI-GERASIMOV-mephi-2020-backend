import {InjectRepository} from '@nestjs/typeorm';
import {LineUp} from '@app/line-up/entities/line-up.entity';
import {Repository} from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LineUpService {
  constructor(
    @InjectRepository(LineUp)
    private readonly NewsRepository: Repository<LineUp>,
  ) {}

  public getItem(id?: string): Promise<LineUp> {
    return this.NewsRepository.findOne({
      order: {
        createdAt: 'ASC',
      },
      ...(id && {
        where: {
          id,
        },
      }),
    });
  }
}
