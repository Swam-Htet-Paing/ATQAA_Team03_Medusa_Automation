import { test, expect } from '@playwright/test'; 

 

test.describe('Diagnostic Verification Suite', () => { 

  test('Verify auto-trace capture on intentional failure', async ({ page }) => { 

    await page.goto('/'); 

    // Intentionally assert an unmatchable locator to test retry & trace capture 

    await expect(page.getByRole('heading', { name: 'Non-Existent Element For Diagnostics' })).toBeVisible({ timeout: 3000 }); 

  }); 

});