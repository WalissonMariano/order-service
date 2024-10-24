import { Item } from '../../item/entities/item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'order_number', nullable: false })
  orderNumber: number;

  @Column({ name: 'order_description', nullable: false })
  orderDescription: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  constructor(order?: Partial<Order>) {
    this.id = order?.id;
    this.orderNumber = order?.orderNumber;
    this.orderDescription = order?.orderDescription;
    this.createdAt = order?.createdAt;
    this.updateAt = order?.updateAt;
  }
}