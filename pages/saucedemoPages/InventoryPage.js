export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.cartBadge = page.locator('.shopping_cart_badge');
    }
    async addItemToCart(productName) {
        const itemCard = this.page.locator('.inventory_item').filter({hasText: productName});
        await itemCard.getByRole('button', {name: 'Add to Cart'}).click();
    }
    async OpenCart() {
        await this.page.locator('.shopping_cart_link').click();
    }
}