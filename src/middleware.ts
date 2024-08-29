import { createClient } from '@libsql/client';

export async function onRequest({ locals, cookies }, next) {
  const turso = createClient({
    url: import.meta.env.TURSO_DATABASE_URL,
    authToken: import.meta.env.TURSO_DATABASE_URL
  });

  locals.db = turso;
  locals.user = cookies.get('user')?.json();
  locals.loggedIn = !!locals.user;

  if (locals.loggedIn) {
    const { rows } = await turso.execute({
      sql: 'SELECT SUM(weight) as karma FROM story_votes WHERE user_id = ?',
      args: [locals.user.id],
    });

    locals.user.karma = rows[0].karma;
  }

  return next();
}
