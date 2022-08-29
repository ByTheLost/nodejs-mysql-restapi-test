import { Router } from 'express';
import { checkJWT } from './jwtauth'

const router = Router();

router.use((req, res, next) => {
  try {
    const authHead = req.headers.authorization;
    if (!authHead) {
      return res.status(400).json({
        msg: 'Debe enviar el token generado',
        code: -1
      })
    }
    const token = authHead.replace('Bearer ', '')
    const payload = checkJWT(token)
    next()
  } catch (error) {
    res.status(500).json({
      msg: `Hubo un error al verificar el token ${error}`,
      code: -1
    })
  }
})

export default router;