import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './Role.entity';
import { Doctor } from './Doctor.entity';

@Entity('user', { schema: 'prescription' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @Column('varchar', { name: 'username', nullable: true, length: 255 })
  username: string | null;

  @OneToOne(() => Doctor, (doctor) => doctor.user)
  doctor: Doctor;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumns: [{ name: 'user_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'role_id', referencedColumnName: 'id' }],
    schema: 'prescription',
  })
  roles: Role[];
}
