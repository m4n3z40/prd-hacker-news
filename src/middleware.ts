export async function onRequest({ locals, cookies }, next) {
  locals.baseApiUrl = import.meta.env.API_BASE_URL;
  locals.user = cookies.get('user')?.json() as User | undefined;
  locals.loggedIn = !!locals.user;

  return next();
}
