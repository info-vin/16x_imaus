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
    await page.goto('/');
    await page.getByRole('link', { name: 'Register' }).click();
    await expect(page).toHaveURL('/register');

    await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();

    await page.getByLabel('Name').fill(TEST_USER.username);
    await page.getByLabel('Email').fill(TEST_USER.email);
    await page.getByLabel('Password').fill(TEST_USER.password);
    await page.getByRole('button', { name: 'Register' }).click();

    // --- Verify Registration Success and Redirect ---
    // As per Manual.md, expect a success message and a redirect to home after confirmation.
    await expect(page.getByText('Registration Successful')).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();

    // After confirmation, user should be on the homepage
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();

    // --- Login ---
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page).toHaveURL('/login');

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    await page.getByLabel('Email').fill(TEST_USER.email);
    await page.getByLabel('Password').fill(TEST_USER.password);
    await page.getByRole('button', { name: 'Login' }).click();

    // After login, should be on the flow page
    await expect(page).toHaveURL('/flow.html');
    await expect(page.getByText('Kanban View')).toBeVisible();
    await expect(page.getByRole('button', { name: new RegExp(TEST_USER.username, 'i') })).toBeVisible();

    // --- Logout ---
    await page.getByRole('button', { name: new RegExp(TEST_USER.username, 'i') }).click();
    await page.getByRole('button', { name: 'Logout' }).click();

    // After logout, user should be back on the homepage
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  });
});
