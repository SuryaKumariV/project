import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly totalClaimsLink: Locator;
  readonly dashboardCount: Locator;
  readonly gridCount: Locator;
  readonly signOutButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#email'); // Updated selector
    this.passwordInput = page.locator('#password'); // Updated selector
    this.loginButton = page.locator('button[type="submit"]'); // Updated selector
    this.signOutButton = page.locator('//button[text()="Sign out"]'); // Updated selector
    this.errorMessage = page.locator('//p[normalize-space()="Invalid email or password. Please try again."]'); // Add this line

  }

  async login(email: string, password: string) {
     await this.page.goto('https://visionary-kangaroo-dfdd41.netlify.app/');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForTimeout(6000); // Explicit wait for 6 seconds
    await expect(page).toHaveURL('https://visionary-kangaroo-dfdd41.netlify.app/dashboard');
  }

  async logout() {
    await this.signOutButton.click();
    await this.page.waitForTimeout(3000); // Explicit wait for 3 seconds
    await expect(this.page).toHaveURL('https://visionary-kangaroo-dfdd41.netlify.app/'); // Verify the URL is the login page
  }
}