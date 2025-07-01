import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Drug } from './Drug.entity';
import { Prescription } from './Prescription.entity';

@Index('FKcd0rbcs0evidq0wwyf1wp0757', ['drugId'], {})
@Index('FKndk52yrijv8ug00ttm6roi34e', ['prescriptionId'], {})
@Entity('prescription_drugs', { schema: 'prescription' })
export class PrescriptionDrugs {
  @PrimaryColumn('bigint', { name: 'prescription_id' })
  prescriptionId: string;

  @PrimaryColumn('bigint', { name: 'drug_id' })
  drugId: string;

  @ManyToOne(() => Drug, (drug) => drug.prescriptionDrugs, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'drug_id', referencedColumnName: 'id' }])
  drug: Drug;

  @ManyToOne(
    () => Prescription,
    (prescription) => prescription.prescriptionDrugs,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'prescription_id', referencedColumnName: 'id' }])
  prescription: Prescription;
}
