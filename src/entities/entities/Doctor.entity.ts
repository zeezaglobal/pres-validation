import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from './User.entity';
import { Patient } from './Patient.entity';

@Entity('doctor', { schema: 'prescription' })
export class Doctor {
  @Column('varchar', { name: 'contact_number', nullable: true, length: 255 })
  contactNumber: string | null;

  @Column('varchar', { name: 'first_name', nullable: true, length: 255 })
  firstName: string | null;

  @Column('varchar', { name: 'hospital_name', nullable: true, length: 255 })
  hospitalName: string | null;

  @Column('varchar', { name: 'last_name', nullable: true, length: 255 })
  lastName: string | null;

  @Column('varchar', { name: 'license_number', nullable: true, length: 255 })
  licenseNumber: string | null;

  @Column('varchar', { name: 'specialization', nullable: true, length: 255 })
  specialization: string | null;

  @Column('bigint', { primary: true, name: 'id' })
  id: string;

  @Column('varchar', { name: 'stripe_username', nullable: true, length: 255 })
  stripeUsername: string | null;

  @Column('int', { name: 'validated', nullable: true })
  validated: number | null;

  @OneToOne(() => User, (user) => user.doctor, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => Patient, (patient) => patient.doctor)
  patients: Patient[];
}
