import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { decodeId, encodeId } from './utils/crypto.util';

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
}
