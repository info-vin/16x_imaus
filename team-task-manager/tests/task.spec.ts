
import { test, expect } from '@playwright/test';

// Reset storage state for this file to ensure tests are isolated
test.use({ storageState: { cookies: [], origins: [] } });

const TEST_USER = {
  username: `taskuser_${Date.now()}`,
  email: `task_${Date.now()}@example.com`,
  password: 'password123',
};

const TEST_TASK = {
  title: 'My New E2E Task',
  description: 'This is a description for the task.',
  updated_title: 'My Updated E2E Task',
};

test.describe('Task Management Flow', () => {
  // Before each test, register and log in a new user
  test.beforeEach(async ({ page }) => {
    // Registration
    await page.goto('/register');
    await page.getByLabel('Username').fill(TEST_USER.username);
    await page.getByLabel('Email').fill(TEST_USER.email);
    await page.getByLabel('Password').fill(TEST_USER.password);
    await page.getByRole('button', { name: 'Register' }).click();
    // Wait for navigation to the main flow page
    await page.waitForURL('/flow.html');
  });

  test('should allow a user to create, edit, and delete a task', async ({ page }) => {
    // --- Create Task ---
    await page.getByRole('button', { name: 'New Task' }).click();

    // Modal should be visible
    await expect(page.getByRole('heading', { name: 'New Task' })).toBeVisible();

    // Fill out the form
    await page.getByLabel('Task Title').fill(TEST_TASK.title);
    await page.getByLabel('Description').fill(TEST_TASK.description);
    await page.getByRole('button', { name: 'Save Task' }).click();

    // --- Verify Task Creation ---
    // Modal should be closed
    await expect(page.getByRole('heading', { name: 'New Task' })).not.toBeVisible();
    // Task card should be on the board
    const taskCard = page.locator('.task-card', { hasText: TEST_TASK.title });
    await expect(taskCard).toBeVisible();
    await expect(taskCard.getByText(TEST_TASK.description)).toBeVisible();

    // --- Edit Task ---
    await taskCard.getByRole('button', { name: 'Edit' }).click();

    // Modal should be visible for editing
    await expect(page.getByRole('heading', { name: 'Edit Task' })).toBeVisible();
    await page.getByLabel('Task Title').fill(TEST_TASK.updated_title);
    await page.getByRole('button', { name: 'Save Task' }).click();

    // --- Verify Task Edit ---
    await expect(page.getByRole('heading', { name: 'Edit Task' })).not.toBeVisible();
    // Check that the old task title is gone
    await expect(page.locator('.task-card', { hasText: TEST_TASK.title })).not.toBeVisible();
    // Check that the new task card with the updated title is visible
    const updatedTaskCard = page.locator('.task-card', { hasText: TEST_TASK.updated_title });
    await expect(updatedTaskCard).toBeVisible();

    // --- Delete Task ---
    await updatedTaskCard.getByRole('button', { name: 'Delete' }).click();

    // --- Verify Task Deletion ---
    // The task card should no longer be on the board
    await expect(updatedTaskCard).not.toBeVisible();
  });
});
