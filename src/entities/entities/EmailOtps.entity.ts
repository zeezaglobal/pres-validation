import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('id', ['id'], { unique: true })
@Index('idx_email_otps_email', ['email'], {})
@Entity('email_otps', { schema: 'prescription' })
export class EmailOtps {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('varchar', { name: 'email', length: 255 })
  email: string;

  @Column('varchar', { name: 'code', length: 10 })
  code: string;

  @Column('timestamp', { name: 'expires_at' })
  expiresAt: Date;

  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;
}
