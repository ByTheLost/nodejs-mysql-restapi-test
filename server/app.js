import express from 'express';
import morgan from 'morgan';
import usersRoutes from './routes/users.routes.js'
import indexRoutes from './routes/index.routes.js';
import claimsRoutes from './routes/claims.routes.js';
import authRoutes from './routes/auth.routes.js';
import { createRoles } from './libs/initialSetup.js';

const app = express();
createRoles();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/ping', indexRoutes);
app.use('/claims', claimsRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

export default app;