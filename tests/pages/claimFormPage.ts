import { Page, Locator, expect } from '@playwright/test';

export class ClaimFormPage {
  readonly page: Page;
  readonly personalInfoSection: Locator;
  readonly employmentInfoSection: Locator;
  readonly submitButton: Locator;
  readonly ssnInput: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.personalInfoSection = page.locator('#personal-info');
    this.employmentInfoSection = page.locator('#employment-info');
    this.submitButton = page.locator('#submit');
    this.ssnInput = page.locator('//div/input[@id='ssn']');
    this.successMessage = page.locator('.success-message');
  }

  async validateSSN(ssn: string) {
    await this.ssnInput.fill(ssn);
    await this.page.locator('#validate-ssn').click();
    await expect(this.page.locator('.ssn-valid')).toBeVisible();
  }

  async fillClaimForm(claimData: any) {
    // Fill out the claim form with provided data
    // ...existing code...
  }

  async submitClaim() {
    await this.submitButton.click();
  }
}