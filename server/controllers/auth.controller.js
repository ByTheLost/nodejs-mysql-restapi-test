import { pool } from '../db.js';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../middlewares/jwtauth.js';

export const singUp = async (req, res) => {

  try {
    const { cc, name, lastname, phone, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash( password, salt );
    console.log(passwordHash);
    const [result] = await pool.query(
      "INSERT INTO users(cc, name, lastname, phone, email, password) VALUES (?,?,?,?,?,?)",
      [cc, name, lastname, phone, email, passwordHash]
    );
    console.log(result);
    res.json({
      id_user: result.insertId,
      cc,
      name,
      lastname,
      phone,
      email,
      password: passwordHash,
      msg: 'Se ha registrado correctamente'
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  };
};

export const singIn = async (req, res) => {
  try {

    // Verificar si el email existe
    const { email, password } = req.body;
    const [result] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email, password
    ]);
    console.log(result);
    if (result.length === 0) {
      return res.status(400).json({
        msg: 'El correo no se encuentra registrado'
      });
    };

    // Verificar contrasena
    const validPassword = await bcrypt.compare(password, result[0].password);
    if (!validPassword) {
      return res.status(400).json({
      msg: 'Contraseña incorrecta'
    });
    };

    // Generar Token
    const Token = await generateJWT(result[0].id_user);
    res.json({
      result: result[0],
      Token
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  };
};