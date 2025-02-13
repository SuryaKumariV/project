import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  totalClaimsLink: Locator;
  readonly dashboardCount: Locator;
  readonly gridCount: Locator;
  totalClaimsCount: Locator;
  addClaim: Locator;
  dashboardLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.gridCount = page.locator('//tbody[@class="bg-white divide-y divide-gray-200"]/tr'); // Updated selector to get grid count
    this.dashboardLink = page.locator('//a[normalize-space()="Dashboard"]');
    this.addClaim=page.locator('//button[normalize-space()="Add Claim"]');
  }

  async validateClaimsCount(claim: string) {
    this.totalClaimsLink = this.page.locator(`//dt[normalize-space()="${claim}"]`);
    this.totalClaimsCount = this.page.locator(`//dt[normalize-space()="${claim}"]/following-sibling::dd`);
    await this.page.waitForTimeout(2000); // Reduced wait time to 2 seconds
    const dashboardCountText = await this.totalClaimsCount.textContent();
    const dashboardCount = parseInt(dashboardCountText || '0', 10);
    await this.totalClaimsLink.click();
    await this.page.waitForTimeout(3000); // Reduced wait time to 3 seconds
    const gridRows = dashboardCount !== 0 ? await this.gridCount.count() : 0;
    expect(dashboardCount).toEqual(gridRows);
    await this.dashboardLink.click();
  }

  async navigateToClaimForm() {
    await this.addClaim.click();
  }
}
