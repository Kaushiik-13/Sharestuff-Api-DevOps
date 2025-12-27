import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './users.entity';
import { Item } from './items.entity';

@Entity('cart')
export class Cart {
  @PrimaryColumn({ type: 'char', length: 36 })
  cart_id: string;

  @Column({ type: 'char', length: 36 })
  user_id: string;

  @Column({ type: 'char', length: 36 })
  item_id: string;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  added_at: Date;

  @Column({ type: 'datetime', nullable: true })
  expires_at: Date;

  @ManyToOne(() => User, (user) => user.cartItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Item, (item) => item.cartItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' })
  item: Item;
}
