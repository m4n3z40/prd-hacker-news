import util from 'node:util';
import { exec } from 'node:child_process';
import test from 'node:test';
import assert from 'node:assert';

const pExec = util.promisify(exec);

test('createSlug should return the slugified version of the input string', async () => {
  const { stdout } = await pExec('node ./index.mjs "Hello World"');
  assert.strictEqual(stdout.trim(), 'hello-world');
});

test('createSlug should handle special characters in the input string', async () => {
  const { stdout } = await pExec('node ./index.mjs "Hello!@#$%^&*()_+World"');
  assert.strictEqual(stdout.trim(), 'hello-world');
});

test('createSlug should return an empty string for an empty input', async () => {
  const { stdout } = await pExec('node ./index.mjs ""');
  assert.strictEqual(stdout.trim(), '');
});

test('createSlug should remove leading/trailing spaces from the input string', async () => {
  const { stdout } = await pExec('node ./index.mjs "   Hello World   "');
  assert.strictEqual(stdout.trim(), 'hello-world');
});
