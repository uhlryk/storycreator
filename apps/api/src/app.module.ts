import { NamesModule as MetaNamesModule } from './meta-characters/names/names.module';
import { NamesModule } from './characters/names/names.module';
import { NationalitiesModule } from './meta-characters/nationalities/nationalities.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    NamesModule,
    MetaNamesModule,
    NationalitiesModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
