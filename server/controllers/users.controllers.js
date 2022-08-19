import { pool } from '../db.js';

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

// Buscar una sola queja
export const getUser = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Queja no encontrada." });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un usuario
export const createUser = async (req, res) => {
  try {
    const { cc, name, lastname, cel, email, password } = req.body;
    const [result] = await pool.query(
      "INSERT INTO users(cc, name, lastname, cel, email, password) VALUES (?,?,?,?,?,?)",
      [cc, name, lastname, cel, email, password]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      cc,
      name,
      lastname,
      cel,
      email,
      password
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar queja
export const updateUser = async (req, res) => {
  try {
    const result = await pool.query("UPDATE users SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar una queja
export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Queja no encontrada" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};