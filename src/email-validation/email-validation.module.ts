import { Module } from '@nestjs/common';
import { EmailValidationService } from './email-validation.service';
import { EmailValidationController } from './email-validation.controller';
import { OtpService } from './otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailOtps } from 'src/entities/entities/EmailOtps.entity';

@Module({
  controllers: [EmailValidationController],
  providers: [EmailValidationService, OtpService],
  imports: [TypeOrmModule.forFeature([EmailOtps])],
})
export class EmailValidationModule {}
