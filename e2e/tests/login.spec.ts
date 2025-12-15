
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('#LoginInputEmail').click();;
    await page.locator('#LoginInputEmail').fill('mail@mail.com');
    await page.locator('input[type="email"]').press('Tab');
    await page.locator('#LoginInputPassword').fill('bestPassword1234');
    await page.getByRole('button', { name: 'Login' }).click();
});