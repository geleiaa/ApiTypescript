import { Router } from 'express';
import { ProductsController } from '../controllers/ProductsController';
import { celebrate, Joi, Segments} from 'celebrate';

const prodsRouter = Router();
const productsController = new ProductsController();

prodsRouter.get('/', productsController.list);

prodsRouter.get(
    '/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    productsController.show
    );

prodsRouter.post(
    '/', 
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required()
        }
    }),
    productsController.create);

prodsRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required()
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    productsController.update);

prodsRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    productsController.delete);

export default prodsRouter;
