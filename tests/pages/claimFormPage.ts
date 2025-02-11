import { Page, Locator } from '@playwright/test';

export class ClaimFormPage {
  readonly page: Page;
  readonly personalInfoSection: Locator;
  readonly employmentInfoSection: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
  }

 
}