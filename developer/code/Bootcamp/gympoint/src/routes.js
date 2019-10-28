import { Router } from 'express';
import * as path from 'path';

// Controllers
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrolmentController from './app/controllers/EnrolmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerHelpOrderController from './app/controllers/AnswerHelpOrderController';

// Authentication Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Index Route
routes.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../public/index.html`));
});

// Session Route
routes.post('/sessions', SessionController.store);

// Checkins Routes
routes.get('/students/:id/checkins', CheckinController.show);
routes.post('/students/:id/checkins', CheckinController.store);

// HelpOrder
routes.get('/students/:id/help-orders', HelpOrderController.index);
routes.post('/students/:id/help-orders', HelpOrderController.store);

// With this “use” statement the routes below will use middleware.
// The above routes will remain unused middleware
routes.use(authMiddleware);

// Student Routes
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

// Plan Routes
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.post('/plans', PlanController.store);
routes.delete('/plans/:id', PlanController.delete);
routes.put('/plans/:id', PlanController.update);

// Enrolment Routes
routes.get('/enrolments', EnrolmentController.index);
routes.get('/enrolments/:id', EnrolmentController.show);
routes.post('/enrolments', EnrolmentController.store);
routes.delete('/enrolments/:id', EnrolmentController.delete);
routes.put('/enrolments/:id', EnrolmentController.update);

export default routes;
