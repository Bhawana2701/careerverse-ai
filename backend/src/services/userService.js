const pool = require("../config/database");

const createUser = async (userData) => {
  const { name, email, education, targetCareer } = userData;

  const query = `
    INSERT INTO users (name, email, education, target_career)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, education, target_career, created_at
  `;

  const values = [name, email, education, targetCareer];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query(`
    SELECT id, name, email, education, target_career, created_at
    FROM users
    ORDER BY created_at DESC
  `);

  return result.rows;
};

module.exports = {
  createUser,
  getAllUsers,
};