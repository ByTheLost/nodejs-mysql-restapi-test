import { pool } from '../db.js';

export const getClaims = (req, res) => {
  res.send('Obteniendo Quejas');
};

export const getClaim = (req, res) => {
  res.send('Obteniendo una Queja');
};

export const createClaim = async (req, res) => {
  const { title, description } = req.body;
  const [result] = await pool.query('INSERT INTO claims(title, description) VALUES (?,?)', [
    title,
    description
  ]);
  console.log(result);
  res.json({
    id: result.insertId,
    title, 
    description,
  });
};

export const updateClaim = (req, res) => {
  res.send('Actualizando Queja');
};

export const deleteClaim = (req, res) => {
  res.send('Eliminando Queja');
};