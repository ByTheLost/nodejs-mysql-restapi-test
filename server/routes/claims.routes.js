import { Router } from 'express';
import {
  getClaims,
  getClaimById,
  createClaim,
  updateClaimById,
  deleteClaimById
} from '../controllers/claims.controller.js';

const router = Router();

router.get('/', getClaims);

router.get('/:id', getClaimById);

router.post('/', createClaim);

router.put('/:id', updateClaimById);

router.delete('/:id', deleteClaimById);

export default router;