import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ClaimFormPage } from '../pages/claimFormPage';
import { Database } from '../utils/database';
import { testUsers, claimData } from '../data/testData';
import { DashboardPage } from '../pages/dashboardPage';
// import { Pool } from 'pg';

test.describe('Unemployment Claim Login', () => {

  test('should successfully Login to unemployment claim', async ({ page }) => {
    test.setTimeout(60000); // Increase the timeout to 60 seconds

    // Login
    const loginPage = new LoginPage(page);   
    await loginPage.login(testUsers.validUser.email, testUsers.validUser.password);
    await expect(page).toHaveURL('https://visionary-kangaroo-dfdd41.netlify.app/dashboard');
    // Verify the dashboard
    const dashboardPage = new DashboardPage(page);    
    await dashboardPage.validateClaimsCount("Total Claims");
    
    await dashboardPage.validateClaimsCount("New Claims");
   
    await dashboardPage.validateClaimsCount("In-Progress Claims");
    // Sign out
    await loginPage.signOutButton.click();
    // Submit claim
    // const claimFormPage = new ClaimFormPage(page);
  });

  test('should fail to login with invalid email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('invalid@example.com', testUsers.validUser.password);
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('should fail to login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testUsers.validUser.email, 'invalidpassword');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('should fail to login with empty email and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', '');
    await expect(loginPage.emailInput).toBeFocused();
  });
});