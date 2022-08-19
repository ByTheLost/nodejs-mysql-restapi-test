import 'dotenv/config';
import express from 'express';
import usersRoutes from './routes/users.routes.js'
import indexRoutes from './routes/index.routes.js';
import claimsRoutes from './routes/claims.routes.js';

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use(claimsRoutes);
app.use(usersRoutes);

app.listen(process.env.PORT);
console.log(`Server on port ${process.env.PORT}`);


