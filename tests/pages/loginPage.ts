import { Page, Locator, expect } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;
 
  constructor(page: Page) {
    this.page = page;
  }

  private get Elements() {
    return {
      emailInput: this.page.locator('#email'), 
      passwordInput: this.page.locator('#password'), 
      loginButton: this.page.locator('button[type="submit"]'), 
      signOutButton: this.page.locator('//button[text()="Sign out"]'), 
      errorMessage: this.page.locator('//p[normalize-space()="Invalid email or password. Please try again."]')
    };
  }

  async login(email: string, password: string) {
    await this.page.goto('https://visionary-kangaroo-dfdd41.netlify.app/');
    await this.Elements.emailInput.fill(email); 
    await this.Elements.passwordInput.fill(password); 
    await this.Elements.loginButton.click(); 
    await this.page.waitForTimeout(6000); 
  }

  async logout() {
    await this.Elements.signOutButton.click(); 
    await this.page.waitForTimeout(3000); 
    await expect(this.page).toHaveURL('https://visionary-kangaroo-dfdd41.netlify.app/'); 
  }

  async errorMessage(nullinput: string) {
    if(nullinput === 'email') 
      await expect(this.Elements.emailInput).toBeFocused();
      else
      
    await expect(this.Elements.errorMessage).toBeVisible();  
}

}

export { LoginPage };