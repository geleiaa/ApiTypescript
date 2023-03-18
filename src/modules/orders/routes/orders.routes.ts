import { Router } from 'express';
import { OrdersController } from '../controllers/OrdersController';
import { celebrate, Joi, Segments } from 'celebrate';
//import { isAuthenticated } from '../../../shared/http/middlewares/isAuthenticated';

const orderRoutes = Router();
const orderContoller = new OrdersController();

orderRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orderContoller.show,
);

orderRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  orderContoller.create,
);

export default orderRoutes;
