import { validationResult } from "express-validator";
import { pool } from "../db.js";

export const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

export const existEmail = async (req, res, next) => {
  const [existEmail] = await pool.query("SELECT * FROM users WHERE email = ?", [
    req.body.email,
  ]);
  if (existEmail.length != 0) {
    return res.status(400).json({
      msg: "El correo ya se encuentra registrado",
    });
  }
  next();
};

export const existCc = async (req, res, next) => {
  const [existCc] = await pool.query("SELECT * FROM users WHERE cc = ?", [
    req.body.cc,
  ]);
  console.log(existCc);
  if (existCc.length != 0) {
    return res.status(400).json({
      msg: "La cedula ya se encuentra registrada",
    });
  }
  next();
};
