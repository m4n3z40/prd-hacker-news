import type { Client } from '@libsql/client';

type GetAllStoriesOpts = {
  type?: PostType;
  by?: string;
  domain?: string;
  title?: string;
  order?: 'new' | 'top';
  perPage?: number;
  page?: number;
};

type ResultMeta = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

type StoryResult = {
  stories: Story[];
  meta: ResultMeta;
};

type StoryMap = {
  [key: number]: Story;
};

type DescendantsResult = {
  stories: StoryMap;
  rootKids: number[];
  meta: { total: number };
};

export default class StoriesRepository {
  constructor() {}

  async create({ title, url, text, type, user_id, parent_id }:Story): Promise<Story> {
    const apiUrl = new URL('http://localhost:8765/stories');

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        url: url || undefined,
        text: text || undefined,
        type,
        user_id,
        parent_id
      }),
    });

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message);
    }

    const { result: story } = await res.json();

    return story as Story;
  }

  async getAll({ type = 'post', by, domain, title, order = 'new', perPage = 30, page = 1 }:GetAllStoriesOpts = {}): Promise<StoryResult> {
    const url = new URL('http://localhost:8765/stories');

    if (type) url.searchParams.set('type', type);
    if (by) url.searchParams.set('by', by);
    if (domain) url.searchParams.set('domain', domain);
    if (title) url.searchParams.set('title', title);
    if (order) url.searchParams.set('order', order);
    if (perPage) url.searchParams.set('perPage', perPage.toString());
    if (page) url.searchParams.set('page', page.toString());

    const res = await fetch(url);

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message);
    }

    const { result: stories, meta } = await res.json();

    return { stories: stories as object as Story[], meta };
  }

  async getAllComments({ perPage = 30, page = 1 } = {}): Promise<StoryResult> {
    const url = new URL('http://localhost:8765/comments');

    if (perPage) url.searchParams.set('perPage', perPage.toString());
    if (page) url.searchParams.set('page', page.toString());

    const res = await fetch(url);

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message);
    }

    const { result: stories, meta } = await res.json();

    return { stories: stories as object as Story[], meta };
  }

  async getById(id:number): Promise<Story | null> {
    const url = new URL(`http://localhost:8765/stories/${id}`);

    const res = await fetch(url);

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message);
    }

    const { result: story } = await res.json();

    return story as object as Story || null;
  }

  async getDescendantsByParentId(parentId:number): Promise<DescendantsResult> {
    const url = new URL(`http://localhost:8765/stories/${parentId}/descendants`);

    const res = await fetch(url);

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message);
    }

    const { result: { stories, rootKids }, meta } = await res.json();

    return { stories: stories as object as StoryMap, rootKids, meta };
  }

  async getRootByDescendantId(id:number): Promise<Story | null> {
    const url = new URL(`http://localhost:8765/stories/${id}/root`);

    const res = await fetch(url);

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message);
    }

    const { result: story } = await res.json();

    return story as object as Story || null;
  }
}
