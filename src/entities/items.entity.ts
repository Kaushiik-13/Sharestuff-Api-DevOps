import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { SellerProfile } from './sellers-profile.entity';
import { ItemImage } from './item-images.entity';
import { RentalRequest } from './rental-requests.entity';
import { Review } from './reviews.entity';
import { Cart } from './cart.entity';

@Entity('items')
export class Item {
  @PrimaryColumn({ type: 'char', length: 36 })
  item_id: string;

  @Column({ type: 'char', length: 36 })
  seller_id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_per_day: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  deposit_amount: number;

  @Column({ type: 'longblob', nullable: true })
  main_image: Buffer;

  @Column({ type: 'enum', enum: ['new', 'like new', 'good', 'used', 'old'], default: 'good' })
  conditions: string;

  @Column({ length: 255, nullable: true })
  location: string;

  @Column({ type: 'boolean', default: false })
  verified_item: boolean;

  @Column({ type: 'enum', enum: ['available', 'unavailable'], default: 'available' })
  status: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => SellerProfile, (seller) => seller.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seller_id' })
  seller: SellerProfile;

  @OneToMany(() => ItemImage, (img) => img.item)
  images: ItemImage[];

  @OneToMany(() => RentalRequest, (req) => req.item)
  rentalRequests: RentalRequest[];

  @OneToMany(() => Review, (review) => review.item)
  reviews: Review[];

  @OneToMany(() => Cart, (cart) => cart.item)
  cartItems: Cart[];
}
