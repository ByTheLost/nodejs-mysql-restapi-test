import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.execute("SELECT 1 + 1 as result");
  console.log(rows[0]);
  res.json(rows[0]);
});

export default router;
