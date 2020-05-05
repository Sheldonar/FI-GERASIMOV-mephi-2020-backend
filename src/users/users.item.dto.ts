import { IsOptional, IsUUID } from 'class-validator';

export class UsersItemDto {
  @IsOptional()
  @IsUUID('4')
  id?: string;
  login?: string;
  password?: string;
}
