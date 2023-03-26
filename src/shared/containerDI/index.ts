import { container } from 'tsyringe';
// Os Repositories são injetados nos Services
import { IOrdersRepository } from '@modules/orders/domain/models/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/repositories/OrdersRepost';

import { IProdsRepository } from '@modules/products/domain/models/IProdsRepository';
import ProdsRepository from '@modules/products/infra/repositories/ProductRepost';

import { IUsersRepository } from '@modules/users/domain/models/IUsersRepository';
import UsersRepository from '@modules/users/infra/repositories/UsersRepost';

import { IUserTokenRepository } from '@modules/users/domain/models/IUserTokenRepository';
import UsersTokenRepository from '@modules/users/infra/repositories/UserTokensRepost';

container.registerSingleton<IProdsRepository>(
  'ProdsRepository',
  ProdsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepost',
  UsersTokenRepository,
);
