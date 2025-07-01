import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from './Patient.entity';
import { PrescriptionDrugs } from './PrescriptionDrugs.entity';

@Index('FKqrlh184tfvdi95erwl65p4xj3', ['patientId'], {})
@Entity('prescription', { schema: 'prescription' })
export class Prescription {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('date', { name: 'prescribed_date', nullable: true })
  prescribedDate: string | null;

  @Column('varchar', { name: 'remarks', nullable: true, length: 255 })
  remarks: string | null;

  @Column('bigint', { name: 'patient_id' })
  patientId: string;

  @ManyToOne(() => Patient, (patient) => patient.prescriptions, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'patient_id', referencedColumnName: 'id' }])
  patient: Patient;

  @OneToMany(
    () => PrescriptionDrugs,
    (prescriptionDrugs) => prescriptionDrugs.prescription,
  )
  prescriptionDrugs: PrescriptionDrugs[];
}
