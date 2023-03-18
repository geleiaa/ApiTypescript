import { Router } from 'express';
import prodsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/user.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import orderRoutes from '@modules/orders/routes/orders.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/products', prodsRouter);
routes.use('/session', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/orders', orderRoutes);

export default routes;
