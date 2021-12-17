import productsRouter from '@modules/products/routes/products.routes';
import passwordsRouter from '@modules/users/routes/passwords.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/passwords', passwordsRouter);

routes.get('/', (request, response) => {
  return response.json({ object: 'Hello world!' });
});

export default routes;
