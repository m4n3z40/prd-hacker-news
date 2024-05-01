// @ts-check
const { test, expect } = require('@playwright/test');

test('has logo', async ({ page }) => {
  await page.goto('https://news.ycombinator.com/');

  // Expect a title "to contain" a substring.
  await expect(page.locator('.pagetop > .hnname > [href="news"]')).toHaveText("Hacker News");
});

test('go to external link', async ({ page }) => {
  await page.goto('https://news.ycombinator.com/');

  // Click the get started link.
  await page.locator('.athing:first-child .titleline > a').click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.url()).not.toMatch(/news\.ycombinator\.com/);
});
