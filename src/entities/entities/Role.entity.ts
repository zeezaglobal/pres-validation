import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';

@Entity('role', { schema: 'prescription' })
export class Role {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
