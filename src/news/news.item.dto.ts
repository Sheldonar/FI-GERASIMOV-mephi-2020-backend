import { IsOptional, IsUUID } from 'class-validator';

export class NewsItemDto {
  @IsOptional()
  @IsUUID('4')
  id?: string;
}
