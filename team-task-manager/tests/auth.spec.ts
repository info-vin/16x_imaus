import { test, expect } from '@playwright/test';

// Reset storage state for this file to ensure tests are isolated
test.use({ storageState: { cookies: [], origins: [] } });

const TEST_USER = {
  username: `testuser_${Date.now()}`,
  email: `test_${Date.now()}@example.com`,
  password: 'password123',
};

test.describe('Authentication Flow', () => {
  test('should allow a user to register, log in, and then log out', async ({ page }) => {
    // --- Registration ---
    await page.goto('/register');

    await expect(page.locator('h2')).toHaveText('Create an Account');

    await page.getByLabel('Username').fill(TEST_USER.username);
    await page.getByLabel('Email').fill(TEST_USER.email);
    await page.getByLabel('Password').fill(TEST_USER.password);
    await page.getByRole('button', { name: 'Register' }).click();

    // After registration, user should be redirected and see the main flow page
    await expect(page).toHaveURL('/flow.html');
    await expect(page.getByText('Kanban View')).toBeVisible(); // A key element on the flow page

    // --- Logout ---
    // Find the user selector button, which contains the username, and click it to reveal the logout button
    await page.getByRole('button', { name: new RegExp(TEST_USER.username, 'i') }).click();
    await page.getByRole('button', { name: 'Logout' }).click();

    // After logout, user should be back on the homepage
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();

    // --- Login ---
    await page.goto('/login');
    await expect(page.locator('h2')).toHaveText('Login to your Account');

    await page.getByLabel('Email').fill(TEST_USER.email);
    await page.getByLabel('Password').fill(TEST_USER.password);
    await page.getByRole('button', { name: 'Login' }).click();

    // After login, should be back on the flow page
    await expect(page).toHaveURL('/flow.html');
    await expect(page.getByText('Kanban View')).toBeVisible();
  });
});
