import { Router } from 'express';
import prodsRouter from '@modules/products/infra/http/routes/products.routes';
import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import orderRoutes from '@modules/orders/infra/http/routes/orders.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/products', prodsRouter);
routes.use('/session', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/orders', orderRoutes);

export default routes;
