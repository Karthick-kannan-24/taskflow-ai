const { query } = require("../config/database");

const createTask = async ({
  projectId,
  title,
  description,
  priority,
  dueDate,
}) => {
  const result = await query(
    `INSERT INTO tasks
      (project_id, title, description, priority, due_date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      projectId,
      title,
      description || null,
      priority,
      dueDate || null,
    ]
  );

  return result.rows[0];
};

const getTasks = async ({
  projectId,
  page,
  limit,
  status,
  priority,
  search,
}) => {
  const offset = (page - 1) * limit;

  const result = await query(
    `SELECT *
     FROM tasks
     WHERE project_id = $1
       AND ($2::text IS NULL OR status = $2)
       AND ($3::text IS NULL OR priority = $3)
       AND title ILIKE $4
     ORDER BY created_at DESC
     LIMIT $5 OFFSET $6`,
    [
      projectId,
      status,
      priority,
      `%${search}%`,
      limit,
      offset,
    ]
  );

  const count = await query(
    `SELECT COUNT(*)::int AS total
     FROM tasks
     WHERE project_id = $1
       AND ($2::text IS NULL OR status = $2)
       AND ($3::text IS NULL OR priority = $3)
       AND title ILIKE $4`,
    [projectId, status, priority, `%${search}%`]
  );

  return {
    tasks: result.rows,
    total: count.rows[0].total,
  };
};

const getTaskById = async (taskId, ownerId) => {
  const result = await query(
    `SELECT t.*
     FROM tasks t
     INNER JOIN projects p ON t.project_id = p.id
     WHERE t.id = $1
       AND p.owner_id = $2`,
    [taskId, ownerId]
  );

  return result.rows[0];
};

const updateTask = async ({
  taskId,
  ownerId,
  title,
  description,
  priority,
  dueDate,
}) => {
  const result = await query(
    `UPDATE tasks
     SET title = $1,
         description = $2,
         priority = $3,
         due_date = $4,
         updated_at = NOW()
     WHERE id = $5
       AND project_id IN (
         SELECT id FROM projects WHERE owner_id = $6
       )
     RETURNING *`,
    [
      title,
      description || null,
      priority,
      dueDate || null,
      taskId,
      ownerId,
    ]
  );

  return result.rows[0];
};

const updateTaskStatus = async ({ taskId, ownerId, status }) => {
  const result = await query(
    `UPDATE tasks
     SET status = $1,
         updated_at = NOW()
     WHERE id = $2
       AND project_id IN (
         SELECT id FROM projects WHERE owner_id = $3
       )
     RETURNING *`,
    [status, taskId, ownerId]
  );

  return result.rows[0];
};

const deleteTask = async (taskId, ownerId) => {
  const result = await query(
    `DELETE FROM tasks
     WHERE id = $1
       AND project_id IN (
         SELECT id
         FROM projects
         WHERE owner_id = $2
       )
     RETURNING id`,
    [taskId, ownerId]
  );

  return result.rows[0];
};

module.exports = {
  createTask,
    getTasks,
    getTaskById,
    updateTask,
    updateTaskStatus,
    deleteTask,
};