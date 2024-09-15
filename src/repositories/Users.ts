import type { Client } from '@libsql/client';
import hashPassword from '../lib/hashPassword.ts';

export default class UsersRepository {
  constructor(private db: Client) {}

  async create({ username, password }: { username: string; password: string }): Promise<bigint> {
    const { lastInsertRowid } = await this.db.execute({
      sql: 'INSERT INTO users (username, password) VALUES (?, ?)',
      args: [username, hashPassword(password)],
    });

    return lastInsertRowid;
  }

  async getByLoginData({ username, password }: { username: string; password: string }): Promise<Story | null> {
    const { rows: [user] } = await this.db.execute({
      sql: 'SELECT id, username, role, created_at FROM users WHERE username = ? AND password = ?',
      args: [username, hashPassword(password)],
    });

    return user as object as Story ?? null;
  }
}
