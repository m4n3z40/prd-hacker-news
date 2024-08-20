/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Story = {
  id: number;
  title?: string;
  text?: string;
  url?: string;
  score: number;
  by: string;
  time: string;
  descendants: number;
  parent?: number;
  kids?: number[];
  type: string;
};
