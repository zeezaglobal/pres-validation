import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './entities/entities/Prescription.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getPrescriptionDetails(id: string) {
    return await this.prescriptionRepository.findOne({
      where: { id: id },
      relations: ['prescriptionDrugs.drug', 'patient', 'patient.doctor'],
    });
  }
}
