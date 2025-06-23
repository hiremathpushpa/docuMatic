const { test, expect } = require('@playwright/test');

test.describe('DocuMatic To-Do App', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
    });

    test('should allow me to add todo items', async ({ page }) => {
        // Create a new todo item
        await page.fill('#todo-input', 'My new test task');
        await page.click('button[type="submit"]');

        // Make sure the new task is visible
        await expect(page.locator('#todo-list li')).toHaveText(/My new test task/);

        // Take a screenshot of the app with the new task
        await page.screenshot({ path: 'test-results/todo-app-task-added.png' });
    });

    test('should allow me to delete todo items', async ({ page }) => {
        // Add a task first
        await page.fill('#todo-input', 'Task to be deleted');
        await page.click('button[type="submit"]');
        await expect(page.locator('#todo-list li')).toHaveText(/Task to be deleted/);

        // Delete the task
        await page.click('.delete-btn');

        // Make sure the task is gone
        await expect(page.locator('#todo-list li')).not.toBeVisible();
    });

    test('should allow me to clear all todo items', async ({ page }) => {
        // Add a few tasks
        await page.fill('#todo-input', 'Task 1');
        await page.click('button[type="submit"]');
        await page.fill('#todo-input', 'Task 2');
        await page.click('button[type="submit"]');

        await expect(page.locator('#todo-list li')).toHaveCount(2);
        
        // Take a screenshot before clearing
        await page.screenshot({ path: 'test-results/todo-app-before-clear.png' });

        // Click the clear all button
        await page.click('#clear-all-btn');

        // Make sure the list is empty
        await expect(page.locator('#todo-list li')).not.toBeVisible();
    });

    test('should allow me to edit a todo item', async ({ page }) => {
        // Add a task
        await page.fill('#todo-input', 'Task to be edited');
        await page.click('button[type="submit"]');
        await expect(page.locator('#todo-list li')).toHaveText(/Task to be edited/);

        // Click the edit button
        await page.click('.edit-btn');

        // Edit the task
        const editInput = page.locator('.edit-input');
        await editInput.fill('Task has been edited');
        await page.click('.save-btn');

        // Verify the task has been edited and take a screenshot
        await expect(page.locator('#todo-list li')).toHaveText(/Task has been edited/);
        await page.screenshot({ path: 'test-results/todo-app-task-edited.png' });
    });
}); 