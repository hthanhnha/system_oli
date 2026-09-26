import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Tên sản phẩm

  @Column('decimal', { precision: 10, scale: 2 })
  marketPrice: number; // Giá thị trường

  @Column('text')
  description: string; // Mô tả sản phẩm

  @Column()
  marketType: string; // Thuộc thị trường gì

  @Column({ nullable: true })
  path: string; // Đường dẫn sản phẩm (vd: /product/honda)

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
