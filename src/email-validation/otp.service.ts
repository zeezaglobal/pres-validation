// src/otp/otp.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { EmailOtps } from 'src/entities/entities/EmailOtps.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(EmailOtps)
    private readonly otpRepo: Repository<EmailOtps>,
  ) {}

  async generateOtp(email: string): Promise<string> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.otpRepo.save({ email, code, expiresAt });

    return code;
  }

  async verifyOtp(email: string, code: string): Promise<boolean> {
    const otpRecord = await this.otpRepo.findOne({
      where: { email, code },
      order: { createdAt: 'DESC' },
    });

    if (!otpRecord) throw new BadRequestException('Invalid OTP');

    if (otpRecord.expiresAt < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    await this.otpRepo.delete({ email });

    return true;
  }
}
