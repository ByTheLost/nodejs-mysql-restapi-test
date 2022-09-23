import { Router } from "express";
import {
  createClaim,
  deleteClaimById,
  getClaimById,
  getClaims,
  updateClaimById,
} from "../controllers/claims.controller.js";
import { validateJWT } from "../middlewares/middlewareToken.js";
import { isAdmin } from "../middlewares/validateRoles.js";

const router = Router();

router.get("/", getClaims);

router.get("/:id", getClaimById);

router.post("/", [validateJWT], createClaim);

router.put("/:id", [validateJWT], updateClaimById);

router.delete("/:id", [validateJWT], deleteClaimById);

export default router;
