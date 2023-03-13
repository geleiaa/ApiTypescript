import { Router } from 'express';
import multer from 'multer';
import uploadConf from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import { UserController } from '../controllers/UsersController';
import { isAuthenticated } from '../../../shared/http/middlewares/isAuthenticated';
import { UserAvatarController } from '../controllers/UserAvatarController';

const usersRouter = Router();
const userController = new UserController();
const avatarController = new UserAvatarController();

const upload = multer(uploadConf);

usersRouter.get('/', isAuthenticated, userController.list);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  avatarController.update,
);

export default usersRouter;
