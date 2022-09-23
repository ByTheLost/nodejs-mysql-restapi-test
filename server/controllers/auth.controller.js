import bcrypt from "bcryptjs";
import { pool } from "../db.js";
import { generateJWT } from "../middlewares/jwtauth.js";

// Registro de usuario
export const singUp = async (req, res) => {
  try {
    const { cc, name, lastname, phone, email, password, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const [result] = await pool.query(
      "INSERT INTO users(cc, name, lastname, phone, email, password) VALUES (?,?,?,?,?,?)",
      [cc, name, lastname, phone, email, passwordHash]
    );
    if (req.body.role === "admin") {
      const [foundRoles] = await pool.query(
        "SELECT id_role FROM roles WHERE name = ?",
        [req.body.role]
      );
      const [foundId] = await pool.query(
        "SELECT id_user FROM users WHERE cc = ?",
        [req.body.cc]
      );
      await pool.query("UPDATE users SET role = ? WHERE id_user = ?", [
        foundRoles[0].id_role,
        foundId[0].id_user,
      ]);
    }
    if (req.body.role === "moderator") {
      const [foundRoles] = await pool.query(
        "SELECT id_role FROM roles WHERE name = ?",
        [req.body.role]
      );
      const [foundId] = await pool.query(
        "SELECT id_user FROM users WHERE cc = ?",
        [req.body.cc]
      );
      await pool.query("UPDATE users SET role = ? WHERE id_user = ?", [
        foundRoles[0].id_role,
        foundId[0].id_user,
      ]);
    }
    if (!req.body.role) {
      const [foundId] = await pool.query(
        "SELECT id_user FROM users WHERE cc = ?",
        [req.body.cc]
      );
      await pool.query("UPDATE users SET role = 3 WHERE id_user = ?", [
        foundId[0].id_user,
      ]);
    }
    res.json({
      id_user: result.insertId,
      cc,
      name,
      lastname,
      phone,
      email,
      password: passwordHash,
      role: role,
      msg: "Se ha registrado correctamente",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login de usuario
export const singIn = async (req, res) => {
  try {
    // Verificar si el email existe
    const { email, password } = req.body;
    const [result] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
      password,
    ]);
    console.log(result);
    if (result.length === 0) {
      return res.status(400).json({
        msg: "El correo no se encuentra registrado",
      });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, result[0].password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Contraseña incorrecta",
      });
    }

    // Generar Token
    const Token = await generateJWT(result[0].id_user);
    res.json({
      result: result[0],
      Token,
    });
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
