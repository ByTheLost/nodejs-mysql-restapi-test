import { pool } from "../db.js";
import { checkJWT } from "./jwtauth.js";

export const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "Debe enviar el token generado",
    });
  }
  try {
    const { uid } = checkJWT(token);
    const [user] = await pool.query("SELECT * FROM users WHERE id_user = ?", [
      uid,
    ]);

    if (user.length === 0) {
      return res.status(401).json({
        msg: "El usuario no existe en la Base de datos",
      });
    };

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "El token no es valido",
    });
  };
};
