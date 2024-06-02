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
  kids?: number[];
  type: string;
};
