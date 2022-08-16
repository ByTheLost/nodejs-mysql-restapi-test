import { Router } from 'express';
import {
  getClaims,
  getClaim,
  createClaim,
  updateClaim,
  deleteClaim
} from '../controllers/claims.controller.js';

const router = Router();

router.get('/claims', getClaims);

router.get('/claims/:id', getClaim);

router.post('/claims', createClaim);

router.put('/claims/:id', updateClaim);

router.delete('/claims/:id', deleteClaim);

export default router;