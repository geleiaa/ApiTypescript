import { Router } from 'express';
import prodsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/user.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/products', prodsRouter);
routes.use('/session', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
