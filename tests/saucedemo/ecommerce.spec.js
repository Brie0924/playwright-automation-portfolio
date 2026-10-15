import { test, expect } from '@playwright/test'
import { EcommerceLoginPage } from '../../pages/saucedemoPages/EcommerceLoginPage'

test('Successful login test', async ({page}) => {
    const ecommerceLoginPage = new EcommerceLoginPage(page);
    await ecommerceLoginPage.goto();
    await ecommerceLoginPage.login('standard_user', 'secret_sauce');
    await expect(page.getByText('Products')).toBeVisible();
})