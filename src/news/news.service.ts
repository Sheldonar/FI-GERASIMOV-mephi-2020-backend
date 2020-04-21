import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {News} from '@app/news/entities/news.entity';
import {Repository} from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly NewsRepository: Repository<News>,
  ) {}

  public getItem(id?: string): Promise<News> {
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
