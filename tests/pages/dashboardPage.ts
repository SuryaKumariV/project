import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get Elements() {
    return {
      gridCount: this.page.locator('//tbody[@class="bg-white divide-y divide-gray-200"]/tr'), // Updated selector to get grid count
      dashboardLink: this.page.locator('//a[normalize-space()="Dashboard"]'),
      addClaim: this.page.locator('//button[normalize-space()="Add Claim"]'),
      totalClaimsLink: (claim: string) => this.page.locator(`//dt[normalize-space()="${claim}"]`),
      totalClaimsCount: (claim: string) => this.page.locator(`//dt[normalize-space()="${claim}"]/following-sibling::dd`)
    };
  }

  async validateClaimsCount(claim: string) {
    const totalClaimsLink = this.Elements.totalClaimsLink(claim); // Updated to use this.Elements
    const totalClaimsCount = this.Elements.totalClaimsCount(claim); // Updated to use this.Elements
    await this.page.waitForTimeout(2000); // Reduced wait time to 2 seconds
    const dashboardCountText = await totalClaimsCount.textContent();
    const dashboardCount = parseInt(dashboardCountText || '0', 10);
    await totalClaimsLink.click();
    await this.page.waitForTimeout(3000); // Reduced wait time to 3 seconds
    const gridRows = dashboardCount !== 0 ? await this.Elements.gridCount.count() : 0; // Updated to use this.Elements
    expect(dashboardCount).toEqual(gridRows);
    await this.Elements.dashboardLink.click(); // Updated to use this.Elements
  }

  async navigateToClaimForm() {
    await this.Elements.addClaim.click(); // Updated to use this.Elements
  }
}
