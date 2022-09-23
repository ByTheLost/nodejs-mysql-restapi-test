export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token primero",
    });
  }
  const { role, name } = req.user[0];
  if (role == "3") {
    return res.status(401).json({
      msg: `${name} no es un administrador o un moderador`,
    });
  }
  next();
};
