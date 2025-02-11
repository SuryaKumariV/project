import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  // ...database configuration...
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Connected to the database');
    client.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

testConnection();
