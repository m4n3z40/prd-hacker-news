import { createClient } from '@libsql/client';
import StoriesRepository from './repository/stories';
import VotesRepository from './repository/votes';
import UsersRepository from './repository/users';

export async function onRequest({ locals, cookies }, next) {
  const turso = createClient({
    url: import.meta.env.TURSO_DATABASE_URL,
    authToken: import.meta.env.TURSO_DATBASE_TOKEN
  });

  const repositories = {
    users: new UsersRepository(turso),
    stories: new StoriesRepository(turso),
    votes: new VotesRepository(turso),
  };

  locals.db = turso;
  locals.repositories = repositories;
  locals.user = cookies.get('user')?.json() as User | undefined;
  locals.loggedIn = !!locals.user;

  if (locals.loggedIn) {
    locals.user.karma = await repositories.votes.getUserKarma(locals.user.id);
  }

  return next();
}
