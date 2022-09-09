import { pool } from "../db.js";

export const createRoles = async () => {
  try {
    const [count] = await pool.query("SELECT * FROM roles");

    if (count.length > 0) return;
    const [values] = await Promise.all([
      pool.query(
        "INSERT INTO roles(name) VALUES ('admin'), ('moderator'), ('user')"
      ),
    ]);
    console.log("Roles creados:", values[0]);
  } catch (error) {
    console.error(error);
  }
};