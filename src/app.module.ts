import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from './entities/entities/Prescription.entity';
import { Doctor } from './entities/entities/Doctor.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: 3306,
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        synchronize: false,
        extra: {
          charset: 'utf8mb4_general_ci',
          ssl: configService.get<string>('DB_SSL') == 'true' ? true : false,
        },
      }),
    }),
    TypeOrmModule.forFeature([Prescription, Doctor]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
