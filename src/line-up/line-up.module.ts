import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LineUpController } from '@app/line-up/line-up.controller';
import { LineUp } from '@app/line-up/entities/line-up.entity';
import { LineUpService } from '@app/line-up/line-up.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LineUp]),
  ],
  controllers: [
    LineUpController,
  ],
  providers: [
    LineUpService,
  ],
})
export class NewsModule {}
