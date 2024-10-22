import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';

  @Entity({ name: 'type_of_items' })
  export class TypeOfItems {
    @PrimaryGeneratedColumn('rowid')
    id: number;
  
    @Column({ name: 'type_items_description', nullable: false })
    typeItemsDescription: string;
  
    @Column({ name: 'tax_percentage', nullable: false })
    taxPercentagem: number;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'update_at' })
    updateAt: Date;
  
    constructor(typeOfItems?: Partial<TypeOfItems>) {
      this.id = typeOfItems?.id;
      this.typeItemsDescription = typeOfItems?.typeItemsDescription;
      this.taxPercentagem = typeOfItems?.taxPercentagem;
      this.createdAt = typeOfItems?.createdAt;
      this.updateAt = typeOfItems?.updateAt;
    }
  }
 