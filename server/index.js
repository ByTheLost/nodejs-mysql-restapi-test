import express from 'express';
import indexRoutes from './routes/index.routes.js';
import claimsRoutes from './routes/claims.routes.js';
import { PORT } from './config.js';

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use(claimsRoutes);

app.listen(PORT);
console.log(`Server on port ${PORT}`);
