import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataRepository } from './data.repository';
import { OtherService } from './other.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DataRepository, OtherService],
})
export class AppModule {}
