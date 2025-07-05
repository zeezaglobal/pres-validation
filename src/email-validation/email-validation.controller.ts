import { Body, Controller, Post } from '@nestjs/common';
import { EmailValidationService } from './email-validation.service';
import { OtpService } from './otp.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('email-validation')
export class EmailValidationController {
  constructor(
    private readonly otpService: OtpService,
    private readonly emailValidationService: EmailValidationService,
  ) {}

  @Post('send-otp')
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    const otp = await this.otpService.generateOtp(sendOtpDto.email);
    await this.emailValidationService.sendOtpEmail(sendOtpDto.email, otp);
    return { message: 'OTP sent to email' };
  }

  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    await this.otpService.verifyOtp(verifyOtpDto.email, verifyOtpDto.code);
    return { message: 'OTP verified successfully' };
  }
}
