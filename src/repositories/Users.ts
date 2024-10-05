export default class UsersRepository {
  constructor(private baseApiUrl) {}

  async create({ username, password }: { username: string; password: string }): Promise<User> {
    const url = new URL(`${this.baseApiUrl}/users`);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message);
    }

    const { result: newUser } = await res.json();

    return newUser;
  }

  async getByUsername(username: string): Promise<User | null> {
    const url = new URL(`${this.baseApiUrl}/users/${username}`);

    const res = await fetch(url);

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message);
    }

    const { result: user } = await res.json();

    return user as object as User ?? null;
  }

  async getByLoginData({ username, password }: { username: string; password: string }): Promise<User | null> {
    const url = new URL(`${this.baseApiUrl}/users/auth`);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message);
    }

    const { result: user } = await res.json();

    return user as object as User ?? null;
  }
}
