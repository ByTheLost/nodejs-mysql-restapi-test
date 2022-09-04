import { Router } from 'express';
import { validateJWT } from '../middlewares/middlewareToken.js';
import { isAdmin } from '../middlewares/validateRoles.js';
import {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
} from '../controllers/users.controllers.js'
import { 
  existCc, 
  existEmail,
  validateFields
} from '../middlewares/validateFields.js';

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.put('/:id', [
  existCc,
  existEmail
],updateUserById);

router.delete('/:id', [
  validateJWT,
  isAdmin,
  validateFields
],deleteUserById);

export default router;