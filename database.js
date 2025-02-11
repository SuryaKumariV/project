import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  // ...database configuration...
});

export default pool;
