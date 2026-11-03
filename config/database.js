import pg from 'pg';

// Render internal URL: no SSL needed. shortcut: an external Render URL needs `ssl: { rejectUnauthorized: false }`.
let pool = null;

export async function getDatabase() {
  if (!pool) pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  return pool;
}

export async function closeDatabase() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export default { getDatabase, closeDatabase };
