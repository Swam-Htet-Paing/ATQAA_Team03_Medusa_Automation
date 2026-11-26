import { Page, Locator, expect } from '@playwright/test'; 

import { BasePage } from './BasePage'; 

 

export class AdminLoginPage extends BasePage { 

  readonly adminUrl: string = 'https://atqaa-medusa-store.onrender.com/app/'; 

  readonly emailInput: Locator; 

  readonly passwordInput: Locator; 

  readonly signInButton: Locator; 

  readonly dashboardHeading: Locator; 

 

  constructor(page: Page) { 

    super(page); 

    this.emailInput = page.getByPlaceholder(/email/i).or(page.locator('input[name="email"]')); 

    this.passwordInput = page.getByPlaceholder(/password/i).or(page.locator('input[name="password"]')); 

    this.signInButton = page.getByRole('button', { name: /sign in|continue|log in/i }); 

    this.dashboardHeading = page.getByRole('heading', { name: /orders|dashboard/i }); 

  } 

 

  async gotoAdmin(): Promise<void> { 

    await this.page.goto(this.adminUrl, { waitUntil: 'domcontentloaded' }); 

  } 

 

  async login(email: string = 'student@vanlangsaigon.edu.vn', password: string = 'vlscStudent123456'): Promise<void> { 

    await this.emailInput.waitFor({ state: 'visible' }); 

    await this.emailInput.fill(email); 

    await this.passwordInput.fill(password); 

    await this.signInButton.click(); 

  } 

 

  async assertLoginSuccess(): Promise<void> { 

    await expect(this.dashboardHeading).toBeVisible({ timeout: 30 * 1000 }); 

  } 

}