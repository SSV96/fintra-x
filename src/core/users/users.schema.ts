import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './interface';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: false })
  emailVerifiedAt: boolean;

  @Column()
  phone: string;

  @Column({ default: false })
  phoneVerifiedAt: boolean;

  @Column({ type: 'json', nullable: true })
  address: Address;
}
