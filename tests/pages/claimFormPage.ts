import { Page, Locator, expect } from '@playwright/test';

export class ClaimFormPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get Elements() {
    return {
      personalInfoSection: this.page.locator('selector-for-personal-info-section'),
      employmentInfoSection: this.page.locator('selector-for-employment-info-section'),
      searchSSN: this.page.locator('button[type="submit"] svg'),
      ssnInput: this.page.locator('//div/input[@id="ssn"]'),
      successMessage: this.page.locator('//div/h1[normalize-space()="Claim Details"]'),
      searchResult: this.page.locator('p[class="text-sm text-gray-500"]'), // Updated to use one locator
      newClaimButton: this.page.locator('//button[normalize-space()="Add New Claim"]'),
      saveButton: this.page.locator('//button[normalize-space()="Save"]'),
      firstNameInput: this.page.locator('//input[@id="firstName"]'),
      lastNameInput: this.page.locator('//input[@id="lastName"]'),
      middleNameInput: this.page.locator('//input[@id="middleName"]'),
      dateofBirthInput: this.page.locator('//input[@id="dob"]'),
      emailInput: this.page.locator('//input[@id="email"]'),
      mobileInput: this.page.locator('//input[@id="mobile"]'),
      companyNameDropdown: this.page.locator('//select[@id="companyName"]'),
      employmentStartDateInput: this.page.locator('//input[@id="employmentStartDate"]'),
      employmentEndDateInput: this.page.locator('//input[@id="employmentEndDate"]'),
      claimSubmittedDateInput: this.page.locator('//input[@id="claimSubmittedDate"]'),
      dueDateInput: this.page.locator('//input[@id="dueDate"]'),
      separationReasonDropdown: this.page.locator('//select[@id="separationReason"]'),
      addressLine1Input: this.page.locator('//input[@id="addressLine1"]'),
      addressLine2Input: this.page.locator('//input[@id="addressLine2"]'),
      zipCodeInput: this.page.locator('//input[@id="zipCode"]'),
    };
  }

  async validateSSN(ssn: string) {
    await this.Elements.ssnInput.fill(ssn);
    await this.Elements.searchSSN.click();
    await this.page.waitForTimeout(3000); 
    const searchResultText = await this.Elements.searchResult.textContent();
    await expect(searchResultText).toContain('No claims found for this SSN.');
    await this.Elements.newClaimButton.click();
    await this.page.waitForTimeout(3000);
    const ssnValue = await this.page.locator('//input[@id="ssn"]').inputValue();
    await expect(ssn).toEqual(ssnValue);
  }

  async fillClaimForm(claimData: any) {
    await this.Elements.firstNameInput.fill(claimData.firstName);
    await this.Elements.lastNameInput.fill(claimData.lastName);
    await this.Elements.middleNameInput.fill(claimData.middleName);
    await this.Elements.dateofBirthInput.fill(claimData.dob);
    await this.Elements.emailInput.fill(claimData.email);
    await this.Elements.mobileInput.fill(claimData.mobile);
    await this.Elements.companyNameDropdown.click();
    await this.Elements.companyNameDropdown.selectOption(claimData.companyName);
    await this.Elements.employmentStartDateInput.fill(claimData.employmentStartDate);
    await this.Elements.employmentEndDateInput.fill(claimData.employmentEndDate);
    await this.Elements.separationReasonDropdown.click();
    await this.Elements.separationReasonDropdown.selectOption(claimData.separationReason);
    await this.Elements.addressLine1Input.fill(claimData.addressLine1);
    await this.Elements.addressLine2Input.fill(claimData.addressLine2);
    await this.Elements.zipCodeInput.fill(claimData.zipCode);
  }

  async submitClaim() {
    await this.Elements.saveButton.click();
    await this.page.waitForTimeout(3000); // Wait for 3 seconds after submitting
    await expect(this.Elements.successMessage).toBeVisible();
  }
}