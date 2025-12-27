import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('logins')
export class Login {
  @PrimaryColumn({ type: 'char', length: 36 })
  login_id: string;

  @Column({ type: 'char', length: 36, unique: true })
  user_id: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', nullable: true })
  last_login: Date;

  @OneToOne(() => User, (user) => user.login, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
