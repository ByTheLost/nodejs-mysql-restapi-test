import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
} from '../controllers/users.controllers.js'

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.put('/:id', updateUserById);

router.delete('/:id', deleteUserById);

export default router;