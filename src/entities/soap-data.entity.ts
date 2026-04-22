import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('soap_data')
export class SoapData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  sp_id: string;

  @Column()
  product_id: string;

  @Column()
  service_id: string;

  @Column()
  update_type: string;

  @Column()
  update_time: string;

  @Column()
  effective_time: string;

  @Column()
  expiry_time: string;

  @Column({ unique: true })
  transaction_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
