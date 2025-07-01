import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrescriptionDrugs } from './PrescriptionDrugs.entity';

@Entity('drug', { schema: 'prescription' })
export class Drug {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'dose', nullable: true, length: 255 })
  dose: string | null;

  @Column('varchar', { name: 'duration', nullable: true, length: 255 })
  duration: string | null;

  @Column('varchar', { name: 'frequency', nullable: true, length: 255 })
  frequency: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'remarks', nullable: true, length: 255 })
  remarks: string | null;

  @Column('int', { name: 'serial_number' })
  serialNumber: number;

  @Column('varchar', { name: 'type', nullable: true, length: 255 })
  type: string | null;

  @OneToMany(
    () => PrescriptionDrugs,
    (prescriptionDrugs) => prescriptionDrugs.drug,
  )
  prescriptionDrugs: PrescriptionDrugs[];
}
