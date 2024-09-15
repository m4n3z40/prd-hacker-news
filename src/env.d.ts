/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type PostType = 'post' | 'comment' | 'job' | 'ask' | 'show';

type Story = {
  id: number;
  title: string;
  text?: string;
  domain?: string;
  url?: string;
  score?: number;
  user_id: number;
  by?: string;
  time_ago?: string;
  descendants?: number;
  parent_id?: number;
  root_id?: number;
  root_title?: string;
  kids?: number[];
  type: PostType;
  created_at: string;
};

type User = {
  id: number;
  username: string;
  password?: string;
  role: string;
  created_at: string;
  karma?: number;
};

declare namespace App {
  interface Locals {
      db: import('@libsql/client').Client;
      repositories: {
        users: import('./repositories/users').default;
        stories: import('./repositories/stories').default;
        votes: import('./repositories/votes').default;
      };
      user?: User;
      loggedIn: boolean;
  }
}
