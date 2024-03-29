import OrdersProducts from '@modules/orders/infra/entities/OrdersProducts';
import { IProds } from '@modules/products/domain/models/IProds';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
class Product implements IProds {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: OrdersProducts[]; // relacionado com a tb orders_products no campo 'products'

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
