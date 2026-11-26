import { test, expect } from '@playwright/test'; 

import * as fs from 'fs'; 

import * as path from 'path'; 

import { ProductPage } from '../pages/ProductPage'; 

import { CartPage } from '../pages/CartPage'; 

import { CheckoutPage, ShippingDetails } from '../pages/CheckoutPage'; 

 

test.describe('Storefront End-to-End Checkout Suite', () => { const customerData: ShippingDetails = { 

    firstName: 'Minh', 

    lastName: 'Nguyen', 

    address: '123 Nguyen Hue Street', 

    postalCode: '70000', 

    city: 'Ho Chi Minh City', 

    email: `e2e.customer.${Date.now()}@testmail.com`, 

  }; 

 

  test('Complete guest checkout journey and capture generated Order ID', async ({ page }) => { 

    const productPage = new ProductPage(page); 

    const cartPage = new CartPage(page); 

    const checkoutPage = new CheckoutPage(page); 

 

    // 1. Browse Catalog & Select Product 

    await productPage.openCatalog(); 

    await productPage.selectFirstProduct(); 

 

    // 2. Select Variant & Add to Cart 

    await productPage.addItemToCart(); 

 

    // 3. Open Cart & Proceed to Checkout 

    await cartPage.openCart(); 

    await cartPage.proceedToCheckout(); 

 

    // 4. Complete Shipping, Delivery & Payment Steps 

    await checkoutPage.fillShippingAddress(customerData); 

    await checkoutPage.selectShippingMethod(); 

    await checkoutPage.selectPaymentAndReview(); 

 

    // 5. Place Order & Verify Confirmation Heading 

    const capturedOrderId = await checkoutPage.placeOrderAndCaptureId(); 

    await expect(page.getByRole('heading', { name: /thank you|order was placed/i })).toBeVisible(); 

    expect(capturedOrderId).toBeTruthy(); 

 

    // Persist Order ID & Email for Task 6.1.4 Admin Reconciliation 

    const stateDir = path.join(__dirname, '../.auth'); 

    fs.mkdirSync(stateDir, { recursive: true }); 

    fs.writeFileSync( 

      path.join(stateDir, 'order-state.json'), 

      JSON.stringify({ orderId: capturedOrderId, email: customerData.email }, null, 2) 

    ); 

  }); 

});