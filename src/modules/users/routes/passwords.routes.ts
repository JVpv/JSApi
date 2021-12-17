import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/forgotPasswordController';

const passwordsRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordsRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.sendEmail,
);

export default passwordsRouter;
