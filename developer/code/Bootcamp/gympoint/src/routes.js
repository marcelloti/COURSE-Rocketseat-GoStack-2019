import { Router } from 'express';
import * as path from 'path';

// Controllers
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

// Middleware de autenticação
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Rota do index
routes.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../public/index.html`));
});

// Rota de session
routes.post('/sessions', SessionController.store);

// Com esta declaração “use” as rotas abaixo usarão o middleware.
// As rotas acima permanecerão sem utilizar o middleware
routes.use(authMiddleware);

// Rotas de alunos
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

export default routes;
