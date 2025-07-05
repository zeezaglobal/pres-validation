import { Controller, Get, Param, Patch, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { decodeId } from './utils/crypto.util';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('prescription/:id')
  @Render('prescription')
  async getPrescriptionData(@Param('id') id: string) {
    const decodedId = decodeId(id);
    const result = await this.appService.getPrescriptionDetails(decodedId);
    return { result };
  }

  @Get('doctors')
  @Render('doctors')
  async getDoctors() {
    const result = await this.appService.getDoctors();
    return { result };
  }

  @Patch('doctors/validate/:id')
  async validateDoctor(@Param('id') doctorId: string) {
    const result = await this.appService.validateDoctor(doctorId);
    return { result: { ...result, success: true } };
  }
}
