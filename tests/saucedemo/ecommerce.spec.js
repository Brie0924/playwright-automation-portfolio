import { test, expect } from '@playwright/test'
import { EcommerceLoginPage } from '../../pages/saucedemoPages/EcommerceLoginPage'
import { InventoryPage } from '../../pages/saucedemoPages/InventoryPage';
import { CartPage } from '../../pages/saucedemoPages/CartPage';
import { CheckoutPage } from '../../pages/saucedemoPages/CheckoutPage';

test('Complete E2E checkout flow: Login to Order Confirmation', async ({page}) => {
    const ecommerceLoginPage = new EcommerceLoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await ecommerceLoginPage.goto();
    await ecommerceLoginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.OpenCart();

    await expect(page).toHaveURL(/.*cart.html/);
    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    await checkoutPage.fillShippingDetails('Jane', 'Doe', '30033');

    // 6. Overview & Finish Step
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await checkoutPage.completeOrder();

    // 7. Final Assertion (Verify order success confirmation)
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(checkoutPage.successHeader).toHaveText('Thank you for your order!');
});