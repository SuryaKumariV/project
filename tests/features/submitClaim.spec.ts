import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ClaimFormPage } from '../pages/claimFormPage';
import { Database } from '../utils/database';
import { testUsers, claimData } from '../data/testData';
import { DashboardPage } from '../pages/dashboardPage';
// import { Pool } from 'pg';

test.describe('Unemployment Claim Login', () => {
  // let database: Database;

  // test.beforeAll(async () => {
  //   database = new Database();
  // });

  // test.afterAll(async () => {
  //   await database.cleanup();
  // });

  test('should successfully Login to unemployment claim', async ({ page }) => {
    // Login
    const loginPage = new LoginPage(page);
    await page.goto('https://visionary-kangaroo-dfdd41.netlify.app/');
    await loginPage.login(testUsers.validUser.email, testUsers.validUser.password);
    // Verify the dashboard
    const dashboardPage = new DashboardPage(page);
    // Explicit wait for 5 seconds
    await page.waitForTimeout(5000);// Explicit wait for 5 seconds
    await dashboardPage.validateClaimsCount("Total Claims");
    // Explicit wait for 5 seconds
    await page.waitForTimeout(5000);
    await dashboardPage.validateClaimsCount("New Claims");
   
    await dashboardPage.validateClaimsCount("In-Progress Claims");
    // // Sign out
      await loginPage.signOutButton.click();
    // // Submit claim
    // const claimFormPage = new ClaimFormPage(page);
   
  });
});