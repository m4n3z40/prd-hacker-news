/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Story = {
  id: number;
  title: string;
  text?: string;
  url?: string;
  score?: number;
  user_id: number;
  by?: string;
  time?: string;
  descendants?: number;
  parent_id?: number;
  kids?: number[];
  type: string;
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
      user?: User;
      loggedIn: boolean;
  }
}
