import { Router } from 'express';
import prodsRouter from '@modules/products/routes/products.routes';

const routes = Router();

routes.use('/products', prodsRouter);

export default routes;
