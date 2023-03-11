import { Router } from 'express';
import prodsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/user.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/products', prodsRouter);

export default routes;
