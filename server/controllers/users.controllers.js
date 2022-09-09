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

// Crear un usuario
export const createUser = async (req, res) => {
  try {
    const { cc, name, lastname, phone, email, password } = req.body;
    const [result] = await pool.query(
      "INSERT INTO users(cc, name, lastname, phone, email, password) VALUES (?,?,?,?,?,?)",
      [cc, name, lastname, phone, email, password]
    );
    console.log(result);
    res.json({
      id_user: result.insertId,
      cc,
      name,
      lastname,
      phone,
      email,
      password,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un usuario
export const updateUserById = async (req, res) => {
  try {
    const result = await pool.query("UPDATE users SET ? WHERE id_user = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario
export const deleteUserById = async (req, res) => {
  try {
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