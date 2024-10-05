export default class VotesRepository {
  constructor(private baseApiUrl) {}

  async create({ userId, storyId, action = 'up' }: { userId:number, storyId:number, action?:'up'|'down' }): Promise<Vote> {
    const url = new URL(`${this.baseApiUrl}/votes`);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        story_id: storyId,
        action,
      }),
    });

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message);
    }

    const { result: vote } = await res.json();

    return vote as object as Vote;
  }
}
