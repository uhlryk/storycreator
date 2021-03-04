import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    // SequelizeModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     dialect: 'postgres',
    //     host: 'postgres',
    //     port: 5432,
    //     username: configService.get('POSTGRES_USER'),
    //     password: configService.get('POSTGRES_PASSWORD'),
    //     database: configService.get('POSTGRES_DB'),
    //     models: [User],
    //     synchronize: true,
    //     autoLoadModels: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
