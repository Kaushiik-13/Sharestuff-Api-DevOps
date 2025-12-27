import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Item } from './items.entity';
import { User } from './users.entity';
import { SellerProfile } from './sellers-profile.entity';

@Entity('rental_requests')
export class RentalRequest {
  @PrimaryColumn({ type: 'char', length: 36 })
  request_id: string;

  @Column({ type: 'char', length: 36 })
  item_id: string;

  @Column({ type: 'char', length: 36 })
  buyer_id: string;

  @Column({ type: 'char', length: 36 })
  seller_id: string;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total_price: number;

  @Column({ type: 'enum', enum: ['pending', 'paid', 'refunded'], default: 'pending' })
  payment_status: string;

  @Column({ type: 'enum', enum: ['pending', 'accepted', 'rejected', 'returned'], default: 'pending' })
  status: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Item, (item) => item.rentalRequests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @ManyToOne(() => User, (user) => user.rentalRequests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'buyer_id' })
  buyer: User;

  @ManyToOne(() => SellerProfile, (seller) => seller.rentalRequests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seller_id' })
  seller: SellerProfile;
}
