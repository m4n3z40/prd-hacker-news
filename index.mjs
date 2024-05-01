import createSlug from './slugify.mjs';

const args = process.argv.slice(2).join(' ');

console.log(createSlug(args));
