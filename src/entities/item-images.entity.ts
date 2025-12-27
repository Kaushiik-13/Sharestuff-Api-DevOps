import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Item } from './items.entity';

@Entity('item_images')
export class ItemImage {
  @PrimaryColumn({ type: 'char', length: 36 })
  image_id: string;

  @Column({ type: 'char', length: 36 })
  item_id: string;

  @Column({ type: 'longblob' })
  image_data: Buffer;

  @ManyToOne(() => Item, (item) => item.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' })
  item: Item;
}
