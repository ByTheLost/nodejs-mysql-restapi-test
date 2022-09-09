import { Router } from "express";
import {
  createClaim,
  deleteClaimById,
  getClaimById,
  getClaims,
  updateClaimById,
} from "../controllers/claims.controller.js";
import { validateJWT } from "../middlewares/middlewareToken.js";

const router = Router();

router.get("/", getClaims);

router.get("/:id", getClaimById);

router.post("/", [validateJWT], createClaim);

router.put("/:id", updateClaimById);

router.delete("/:id", deleteClaimById);

export default router;