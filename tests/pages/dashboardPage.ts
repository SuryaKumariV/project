import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  totalClaimsLink: Locator;
  readonly dashboardCount: Locator;
  readonly gridCount: Locator;
  totalClaimsCount: Locator;
    dashboardLink: Locator;
constructor(page: Page) {
   this.page = page;
    this.gridCount = page.locator('//tbody[@class="bg-white divide-y divide-gray-200"]/tr'); // Updated selector to get grid count
    this.dashboardLink= page.locator('//a[normalize-space()="Dashboard"]');
    
  }

  async validateClaimsCount( claim) {
    this.totalClaimsLink = this.page.locator(`//dt[normalize-space()="${claim}"]`);
    this.totalClaimsCount = this.page.locator(`//dt[normalize-space()="${claim}"]/following-sibling::dd`);
    const dashboardCountText = await this.totalClaimsCount.textContent();
    await this.page.waitForTimeout(3000); // Explicit wait for 3 seconds to load the count
    const dashboardCount = parseInt(dashboardCountText || '0', 10);
    await this.totalClaimsLink.click();
    const isRowAttached = await this.gridCount.getAttribute("tr"); // Explicit wait for 3 seconds to load the grid
    console.log(isRowAttached);
    const gridRows = isRowAttached ? await this.gridCount.count() : 0;
    expect(dashboardCount).toEqual(gridRows);
    await this.dashboardLink.click();
  }

 
}
