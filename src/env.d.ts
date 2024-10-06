/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type PostType = 'post' | 'comment' | 'job' | 'ask' | 'show';

type Story = {
  id: number;
  slug?: string;
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
  root_slug?: string;
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

type Vote = {
  id: number;
  user_id: number;
  story_id: number;
  weight: number;
  created_at: string;
};

declare namespace App {
  interface Locals {
      baseApiUrl: string;
      user?: User;
      loggedIn: boolean;
  }
}
