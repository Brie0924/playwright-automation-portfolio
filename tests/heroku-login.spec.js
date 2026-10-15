import { test , expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('successful login test', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
});

test('should show error with invalid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('wrongUser999', 'incorrectPassword123');

    await expect(page.getByText('Your username is invalid!')).toBeVisible();
});