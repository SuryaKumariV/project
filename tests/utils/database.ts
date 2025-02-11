import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || '5432'),
    });
  }

  async query(text: string, params?: any[]) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(text, params);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getClaimById(claimId: string) {
    return this.query('SELECT * FROM claims WHERE id = $1', [claimId]);
  }

  async cleanup() {
    await this.pool.end();
  }
}