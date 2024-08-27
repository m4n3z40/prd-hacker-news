import Database from 'better-sqlite3';

export function onRequest({ locals, cookies }, next) {
  const db = new Database('./src/data/phn.db', { verbose: console.log });

  locals.db = db;
  locals.user = cookies.get('user')?.json();
  locals.loggedIn = !!locals.user;

  if (locals.loggedIn) {
    locals.user.karma = db
      .prepare('SELECT SUM(weight) as karma FROM story_votes WHERE user_id = ?')
      .get(locals.user.id)
      .karma || 0;
  }

  return next();
}
