import { Router } from "express";
import { check } from 'express-validator';
import { singIn, singUp } from "../controllers/auth.controller.js";
import { existCc, existEmail, validateFields } from '../middlewares/validateFields.js';

const router = Router();

router.post("/signup",[
  check('cc', 'La cedula es obligatoria').not().isEmpty().isInt().isLength({ max: 10}),
  check('name', 'El nombre es obligatorio').not().isEmpty().isString().isLength({ min: 3 }),
  check('lastname', 'El apellido es obligatorio').not().isEmpty().isString().isLength({ min: 3 }),
  check('phone', 'La celular es obligatorio').not().isEmpty().isMobilePhone(),
  check('email', 'El email no es valido').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('password', 'La contraseña debe tener como minimo 5 caracteres').isLength({ min: 5 }),
  validateFields,
  existCc,
  existEmail
],singUp);

router.post("/signin", [
  check('email', 'El email no es valido').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validateFields,
],singIn);

export default router;