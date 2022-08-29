import { Router } from "express";
import { check } from 'express-validator'
import { existEmail, validateFields, existCc } from '../middlewares/validateFields.js';
import { singUp, singIn } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup",[
  check('cc', 'La cedula es obligatoria').not().isEmpty(),
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('lastname', 'El apellido es obligatorio').not().isEmpty(),
  check('phone', 'La celular es obligatorio').not().isEmpty(),
  check('email', 'El email no es valido').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('password', 'La contraseña debe tener como minimo 5 caracteres').isLength({ min: 5 }),
  validateFields,
  existCc,
  existEmail
],singUp);

router.post("/signin",[
  check('email', 'El email no es valido').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validateFields
],singIn);

export default router;