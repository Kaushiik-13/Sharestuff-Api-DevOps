import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Item } from './items.entity';
import { SellerProfile } from './sellers-profile.entity';
import { User } from './users.entity';

@Entity('reviews')
export class Review {
  @PrimaryColumn({ type: 'char', length: 36 })
  review_id: string;

  @Column({ type: 'char', length: 36 })
  item_id: string;

  @Column({ type: 'char', length: 36 })
  seller_id: string;

  @Column({ type: 'char', length: 36 })
  reviewer_id: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Item, (item) => item.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @ManyToOne(() => SellerProfile, (seller) => seller.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seller_id' })
  seller: SellerProfile;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: User;
}
