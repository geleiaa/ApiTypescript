import User from '@modules/users/infra/entities/User';

export interface IOrders {
  id: string;
  user: User;
  created_at: Date;
  updated_at: Date;
}
