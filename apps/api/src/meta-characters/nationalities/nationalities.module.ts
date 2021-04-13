import { NationalitiesController } from './nationalities.controller';
import { Module } from '@nestjs/common';
import { Nationality } from './nationality.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { NationalitiesService } from './nationalities.service';

@Module({
  imports: [SequelizeModule.forFeature([Nationality])],
  exports: [SequelizeModule, NationalitiesService],
  controllers: [NationalitiesController],
  providers: [NationalitiesService],
})
export class NationalitiesModule {}
