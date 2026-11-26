import { test, expect } from '@playwright/test'; 

import * as fs from 'fs'; 

import * as path from 'path'; 

import { AdminLoginPage } from '../pages/AdminLoginPage'; 

import { AdminOrderPage } from '../pages/AdminOrderPage'; 

 

test.describe('Admin Order Fulfillment Reconciliation Suite', () => { 

  test('Reconcile Storefront checkout order inside Admin Portal', async ({ page }) => { 

    const stateFile = path.join(__dirname, '../.auth/order-state.json'); 

    expect(fs.existsSync(stateFile), 'Order state file from checkout.spec.ts must exist').toBeTruthy(); 

 

    const { orderId, email } = JSON.parse(fs.readFileSync(stateFile, 'utf-8')); 

 

    const adminLoginPage = new AdminLoginPage(page); 

    const adminOrderPage = new AdminOrderPage(page); 

 

    // 1. Authenticate into Medusa Admin Portal 

    await adminLoginPage.gotoAdmin(); 

    await adminLoginPage.login(); 

    await adminLoginPage.assertLoginSuccess(); 

 

    // 2. Navigate to Orders & Search by Captured Order ID 

    await adminOrderPage.navigateToOrders(); 

    await adminOrderPage.searchAndOpenOrder(orderId); 

 

    // 3. Reconcile Customer Email & Payment Status ("Captured") 

    await adminOrderPage.verifyOrderReconciliation(email, 'Captured'); 

  }); 

});