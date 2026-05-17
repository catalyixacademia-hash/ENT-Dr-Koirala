import { test, expect } from '@playwright/test';

test('verify language persistence across pages', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Change language to Nepali on Home page
  // The toggle button is usually in the navbar. Let's find it.
  // It has text "EN" or "NE" or something similar.
  const langButton = page.getByRole('button', { name: /NE/i }).or(page.getByRole('button', { name: /नेपाली/i }));
  if (await langButton.isVisible()) {
    await langButton.click();
  } else {
      // Fallback if button text is different
      const nav = page.locator('nav');
      await nav.getByRole('button').last().click();
  }

  // Check if home page changed to Nepali
  // Looking for "मुख्य पृष्ठ" or similar
  await expect(page.locator('body')).toContainText(/विशेषज्ञ/i);

  // Navigate to About page
  await page.getByRole('link', { name: /हाम्रो बारेमा/i }).or(page.getByRole('link', { name: /About/i })).click();

  // Verify if it is still in Nepali
  await expect(page.url()).toContain('/about');
  await expect(page.locator('body')).toContainText(/हाम्रो बारेमा/i);

  await page.screenshot({ path: 'persistence_about_ne.png' });
});
