const { query } = require("../config/database");

const createProject = async ({ name, description, ownerId }) => {
  const result = await query(
    `INSERT INTO projects (name, description, owner_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, description || null, ownerId]
  );

  return result.rows[0];
};

const getProjectsByOwner = async ({
  ownerId,
  page,
  limit,
  search,
}) => {
  const offset = (page - 1) * limit;

  const result = await query(
    `SELECT *
     FROM projects
     WHERE owner_id = $1
       AND name ILIKE $2
     ORDER BY created_at DESC
     LIMIT $3 OFFSET $4`,
    [ownerId, `%${search}%`, limit, offset]
  );

  const count = await query(
    `SELECT COUNT(*)::int AS total
     FROM projects
     WHERE owner_id = $1
       AND name ILIKE $2`,
    [ownerId, `%${search}%`]
  );

  return {
    projects: result.rows,
    total: count.rows[0].total,
  };
};

const getProjectById = async (id, ownerId) => {
  const result = await query(
    `SELECT *
     FROM projects
     WHERE id = $1 AND owner_id = $2`,
    [id, ownerId]
  );

  return result.rows[0];
};

const updateProject = async ({ id, ownerId, name, description }) => {
  const result = await query(
    `UPDATE projects
     SET name = $1,
         description = $2,
         updated_at = NOW()
     WHERE id = $3
       AND owner_id = $4
     RETURNING *`,
    [name, description || null, id, ownerId]
  );

  return result.rows[0];
};

const deleteProject = async (id, ownerId) => {
  const result = await query(
    `DELETE FROM projects
     WHERE id = $1
       AND owner_id = $2
     RETURNING id`,
    [id, ownerId]
  );

  return result.rows[0];
};

module.exports = { createProject, getProjectsByOwner, getProjectById, updateProject, deleteProject };