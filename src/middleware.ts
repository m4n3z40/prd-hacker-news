import { createClient } from '@libsql/client';

export async function onRequest({ locals, cookies }, next) {
  const turso = createClient({
    url: import.meta.env.TURSO_DATABASE_URL,
    authToken: import.meta.env.TURSO_DATBASE_TOKEN
  });

  locals.db = turso;
  locals.user = cookies.get('user')?.json() as User | undefined;
  locals.loggedIn = !!locals.user;

  return next();
}
