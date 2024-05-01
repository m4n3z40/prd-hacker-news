import test from 'node:test';
import assert from 'node:assert'
import createSlug from './slugify.mjs';

// Test case 1: Test with a simple string
test('createSlug should return the slugified version of the input string', () => {
  const input = 'Hello World';
  const expectedOutput = 'hello-world';
  const actualOutput = createSlug(input);
  assert.strictEqual(actualOutput, expectedOutput);
});

// Test case 2: Test with a string containing special characters
test('createSlug should handle special characters in the input string', () => {
  const input = 'Hello!@#$%^&*()_+World';
  const expectedOutput = 'hello-world';
  const actualOutput = createSlug(input);
  assert.strictEqual(actualOutput, expectedOutput);
});

// Test case 3: Test with an empty string
test('createSlug should return an empty string for an empty input', () => {
  const input = '';
  const expectedOutput = '';
  const actualOutput = createSlug(input);
  assert.strictEqual(actualOutput, expectedOutput);
});

// Test case 4: Test with a string containing leading/trailing spaces
test('createSlug should remove leading/trailing spaces from the input string', () => {
  const input = '   Hello World   ';
  const expectedOutput = 'hello-world';
  const actualOutput = createSlug(input);
  assert.strictEqual(actualOutput, expectedOutput);
});
