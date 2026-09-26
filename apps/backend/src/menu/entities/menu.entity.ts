import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Tên menu (vd: Trang chủ, Sản phẩm)

  @Column()
  path: string; // Đường dẫn (vd: /home, /products)

  @Column({ default: true })
  isActive: boolean; // Trạng thái hiển thị

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
