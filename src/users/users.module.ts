import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Users} from '@app/users/entities/users.entity';
import {UsersController} from '@app/users/users.controller.ts';
import {UsersService} from '@app/users/users.service.ts';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [
    UsersController,
  ],
  providers: [
    UsersService,
  ],
})
export class UsersModule {}