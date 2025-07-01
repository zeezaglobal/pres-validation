import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Prescription } from './Prescription.entity';
import { Doctor } from './Doctor.entity';

@Index('FKmer5utvy1hiff7ovs6f4bjtnw', ['doctorId'], {})
@Entity('patient', { schema: 'prescription' })
export class Patient {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'address', nullable: true, length: 255 })
  address: string | null;

  @Column('varchar', { name: 'contact_number', nullable: true, length: 255 })
  contactNumber: string | null;

  @Column('varchar', { name: 'date_of_birth', nullable: true, length: 255 })
  dateOfBirth: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @Column('varchar', { name: 'first_name', nullable: true, length: 255 })
  firstName: string | null;

  @Column('varchar', { name: 'gender', nullable: true, length: 255 })
  gender: string | null;

  @Column('varchar', { name: 'last_name', nullable: true, length: 255 })
  lastName: string | null;

  @Column('varchar', { name: 'medical_history', nullable: true, length: 255 })
  medicalHistory: string | null;

  @Column('bigint', { name: 'number_of_visit', nullable: true })
  numberOfVisit: string | null;

  @Column('bigint', { name: 'doctor_id' })
  doctorId: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.patients, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'doctor_id', referencedColumnName: 'id' }])
  doctor: Doctor;

  @OneToMany(() => Prescription, (prescription) => prescription.patient)
  prescriptions: Prescription[];
}
