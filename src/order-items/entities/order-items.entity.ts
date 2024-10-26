import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'order_items'})
export class OrderItems {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'order_id', nullable: false })
    orderId: number;

    @Column({ name: 'item_id', nullable: false })
    itemId: number;

    @Column({ name: 'quantity', nullable: false })
    quantity: number;

    @Column('decimal', {
    name: 'tax_value',
    nullable: false,
    precision: 6,
    scale: 2,
    })
    taxValue: number;

    @Column('decimal', {
    name: 'total_value',
    nullable: false,
    precision: 6,
    scale: 2,
    })
    totalValue: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updateAt: Date;

}