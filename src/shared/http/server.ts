import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/appError';
import { pagination } from 'typeorm-pagination';
import '@shared/typeorm';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server on!!');
});

/*
Lembra de criar esses arquivos aqui
.docker/entrypoint.sh:

  #!/bin/bash

  npm install
  npm run typeorm migration:run
  npm run dev


ormconfig.json:
  {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "docker",
    "database": "apijs",
    "entities": ["./src/modules/** /typeorm/entities/*.ts"],
    "migrations": [
      "./src/shared/typeorm/migrations/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/shared/typeorm/migrations"
    }
  }

*/
