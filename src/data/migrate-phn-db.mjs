import Database from 'better-sqlite3';

const db = new Database('./src/data/phn.db', { verbose: console.log });

db.pragma('journal_mode = WAL');

const createUsersTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK( role IN ('user','admin') ) NOT NULL DEFAULT 'user',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const createStoriesTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS stories (
    id INTEGER PRIMARY KEY,
    parent_id INTEGER,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    domain TEXT,
    url TEXT,
    type TEXT CHECK( type IN ('post','comment', 'ask', 'show', 'job') ) NOT NULL DEFAULT 'post',
    user_id INTEGER NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(parent_id) REFERENCES stories(id)
  );
`);

const createVotesTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS story_votes (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    story_id INTEGER NOT NULL,
    weight DECIMAL NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, story_id) ON CLONFLICT ABORT,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(story_id) REFERENCES stories(id)
  );
`);

const runMigrations = db.transaction(() => {
  createUsersTable.run();
  createStoriesTable.run();
  createVotesTable.run();
});

runMigrations();
