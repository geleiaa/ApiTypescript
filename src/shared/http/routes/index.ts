import { Router } from 'express';
import prodsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/user.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/products', prodsRouter);
routes.use('/session', sessionsRouter);

export default routes;
