import { Router } from "express";
import {
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

router.get("/", [validateJWT, isAdmin], getUsers);

router.get("/:id", [validateJWT, isAdmin],getUserById);

router.put("/:id", [validateJWT, isAdmin, existCc, existEmail], updateUserById);

router.delete("/:id", [validateJWT, isAdmin, validateFields], deleteUserById);

export default router;
