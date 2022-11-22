import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import morgan from "morgan";
import { createRoles } from "./libs/initialSetup.js";
import authRoutes from "./routes/auth.routes.js";
import claimsRoutes from "./routes/claims.routes.js";
import indexRoutes from "./routes/index.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();
createRoles();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use("/ping", indexRoutes);
app.use("/claims", claimsRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

export default app;
