import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailValidationService {
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
    if (!apiKey) throw new Error('SendGrid API key not configured');
    sgMail.setApiKey(apiKey);
  }

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const from =
      this.configService.get<string>('FROM_EMAIL') || 'zeeza.global@gmail.com';
    console.log(to, otp);
    const msg = {
      to,
      from,
      subject: 'Your OTP Code',
      html: `<p>Your OTP code is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
    };

    try {
      await sgMail.send(msg);
    } catch (error: any) {
      console.log(error.response.body.errors);
      throw new Error('Failed to send email', error);
    }
  }
}
