import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NationalitiesModule } from '../nationalities/nationalities.module';
import { Name } from './name.model';
import { NamesController } from './names.controller';
import { NamesService } from './names.service';

@Module({
  imports: [SequelizeModule.forFeature([Name]), NationalitiesModule],
  exports: [SequelizeModule, NamesService],
  controllers: [NamesController],
  providers: [NamesService],
})
export class NamesModule {}
