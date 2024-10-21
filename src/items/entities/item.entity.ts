import { Order } from '../../order/entities/order.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'order_id', nullable: false })
  orderId: number;

  @Column({ name: 'number_item', nullable: false })
  numberItem: number;

  @Column({ name: 'items_description', nullable: false })
  itemDescription: string;

  @Column({ name: 'id_type_of_items', nullable: false })
  idTypeOfItems: number;

  @Column('decimal', {
    name: 'quantity',
    nullable: false,
    precision: 6,
    scale: 2,
  })
  quantity: number;

  @Column('decimal', {
    name: 'unit_value',
    nullable: false,
    precision: 6,
    scale: 2,
  })
  unitValue: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  constructor(item?: Partial<Item>) {
    this.id = item?.id;
    this.orderId = item?.orderId;
    this.numberItem = item?.numberItem;
    this.itemDescription = item?.itemDescription;
    this.idTypeOfItems = item?.idTypeOfItems;
    this.quantity = item?.quantity;
    this.unitValue = item?.unitValue;
    this.createdAt = item?.createdAt;
    this.updateAt = item?.updateAt;
  }
}
