import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './users.entity';
import { Item } from './items.entity';
import { RentalRequest } from './rental-requests.entity';
import { Review } from './reviews.entity';

@Entity('sellers_profile')
export class SellerProfile {
  @PrimaryColumn({ type: 'char', length: 36 })
  seller_id: string;

  @Column({ type: 'char', length: 36, unique: true })
  user_id: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ length: 100 })
  photo_id_type: string;

  @Column({ length: 100 })
  photo_id_number: string;

  @Column({ type: 'longblob' })
  photo_id_image: Buffer;

  @Column({ type: 'enum', enum: ['pending', 'verified', 'rejected'], default: 'pending' })
  verification_status: 'pending' | 'verified' | 'rejected';

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0.0 })
  profile_rating: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  joined_date: string;

  @Column({ type: 'int', default: 0 })
  completed_rentals: number;

  @Column({ type: 'int', default: 0 })
  total_items_listed: number;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @OneToOne(() => User, (user) => user.sellerProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Item, (item) => item.seller)
  items: Item[];

  @OneToMany(() => RentalRequest, (req) => req.seller)
  rentalRequests: RentalRequest[];

  @OneToMany(() => Review, (review) => review.seller)
  reviews: Review[];
}
