const pool = require("../config/database");

const createSkill = async (skillData) => {
  const { userId, skillName, skillLevel } = skillData;

  const query = `
    INSERT INTO skills (user_id, skill_name, skill_level)
    VALUES ($1, $2, $3)
    RETURNING id, user_id, skill_name, skill_level, created_at
  `;

  const values = [userId, skillName, skillLevel];

  const result = await pool.query(query, values);

  return result.rows[0];
};


const getUserSkills = async (userId) => {
  const query = `
    SELECT id, user_id, skill_name, skill_level, created_at
    FROM skills
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
};


const updateSkillLevel = async (skillId, skillLevel) => {
  const query = `
    UPDATE skills
    SET skill_level = $1
    WHERE id = $2
    RETURNING id, user_id, skill_name, skill_level, created_at
  `;

  const result = await pool.query(query, [
    skillLevel,
    skillId,
  ]);

  return result.rows[0];
};


const deleteSkill = async (skillId) => {
  const query = `
    DELETE FROM skills
    WHERE id = $1
    RETURNING id
  `;

  const result = await pool.query(query, [skillId]);

  return result.rows[0];
};


module.exports = {
  createSkill,
  getUserSkills,
  updateSkillLevel,
  deleteSkill,
};