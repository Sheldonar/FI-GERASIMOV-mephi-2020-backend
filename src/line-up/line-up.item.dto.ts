import { IsOptional, IsUUID } from 'class-validator';

export class LineUpItemDto {
  @IsOptional()
  @IsUUID('4')
  id?: string;
  name?: string;
  style?: string;
  rating?: number;
}
