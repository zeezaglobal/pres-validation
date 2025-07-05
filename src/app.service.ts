import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './entities/entities/Prescription.entity';
import { Doctor } from './entities/entities/Doctor.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
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

  async getDoctors() {
    return await this.doctorRepository.find();
  }

  async validateDoctor(doctorId: string) {
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId },
    });
    if (doctor) {
      return await this.doctorRepository.update(doctorId, {
        ...doctor,
        validated: 1,
      });
    } else {
      return NotFoundException;
    }
  }
}
