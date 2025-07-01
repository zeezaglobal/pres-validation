import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from './entities/entities/Prescription.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '147.93.43.194',
      port: 3306,
      username: 'readonly_user',
      password: 'strong_password',
      database: 'prescription',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: false,
      extra: {
        charset: 'utf8mb4_general_ci',
        ssl: false,
      },
    }),
    TypeOrmModule.forFeature([Prescription]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
