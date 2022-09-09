import { pool } from "../db.js";

// Buscar todas la quejas
export const getClaims = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM claims ORDER BY createdAt ASC"
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Buscar una sola queja
export const getClaimById = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM claims WHERE id_claim = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Queja no encontrada." });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear una queja
export const createClaim = async (req, res) => {
  try {
    const user = req.user[0];
    const { title, description } = req.body;
    const [result] = await pool.query(
      "INSERT INTO claims(title, description) VALUES (?,?)",
      [title, description]
    );
    await pool.query("UPDATE claims SET id_user = ? WHERE id_claim = ?", [user.id_user, result.insertId])
    res.json({
      id_claim: result.insertId,
      title,
      description,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar queja
export const updateClaimById = async (req, res) => {
  try {
    const result = await pool.query("UPDATE claims SET ? WHERE id_claim = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar una queja
export const deleteClaimById = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM claims WHERE id_claim = ?", [
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