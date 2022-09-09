import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/users.controllers.js";
import { validateJWT } from "../middlewares/middlewareToken.js";
import {
  existCc,
  existEmail,
  validateFields,
} from "../middlewares/validateFields.js";
import { isAdmin } from "../middlewares/validateRoles.js";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.put("/:id", [existCc, existEmail], updateUserById);

router.delete("/:id", [validateJWT, isAdmin, validateFields], deleteUserById);

export default router;
