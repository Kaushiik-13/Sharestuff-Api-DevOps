import { Entity, PrimaryColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Login } from './logins.entity';
import { SellerProfile } from './sellers-profile.entity';
import { RentalRequest } from './rental-requests.entity';
import { Review } from './reviews.entity';
import { Cart } from './cart.entity';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'char', length: 36 })
  user_id: string;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({ type: 'longblob', nullable: true })
  profile_pic: Buffer;

  @Column({ length: 20 })
  phone_number: string;

  @Column({ length: 100, nullable: true })
  state: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'boolean', default: false })
  email_verified: boolean;

  @Column({ type: 'boolean', default: false })
  phone_verified: boolean;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToOne(() => Login, (login) => login.user)
  login: Login;

  @OneToOne(() => SellerProfile, (seller) => seller.user)
  sellerProfile: SellerProfile;

  @OneToMany(() => RentalRequest, (req) => req.buyer)
  rentalRequests: RentalRequest[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];

  @OneToMany(() => Cart, (cart) => cart.user)
  cartItems: Cart[];
}
