import pg from 'pg';

// Render's internal URL needs no SSL; the external one (*.render.com) requires it.
let pool = null;

export async function getDatabase() {
  if (!pool) pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('.render.com') ? { rejectUnauthorized: false } : false,
  });
  return pool;
}

export async function closeDatabase() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export default { getDatabase, closeDatabase };
