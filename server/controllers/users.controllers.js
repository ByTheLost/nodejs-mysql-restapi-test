import bcrypt from "bcryptjs";
import { pool } from "../db.js";

// Buscar todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM users ORDER BY createdAt ASC"
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Buscar un solo usuario
export const getUserById = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM users WHERE id_user = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un usuario
export const updateUserById = async (req, res) => {
  try {
    const { cc, name, lastname, phone, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    req.body = {
      cc: cc,
      name: name,
      lastname: lastname,
      phone: phone,
      email: email,
      password: passwordHash,
    };
    const [result] = await pool.query("UPDATE users SET ? WHERE id_user = ?", [
      req.body,
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    };
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario
export const deleteUserById = async (req, res) => {
  try {
    await pool.query("DELETE FROM claims WHERE id_user = ?", [
      req.params.id,
    ]);
    const [result] = await pool.query("DELETE FROM users WHERE id_user = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado.",
      });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
