import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ClaimFormPage } from '../pages/claimFormPage';
import { testUsers, claimData } from '../data/testData';
import { DashboardPage } from '../pages/dashboardPage';

test.describe('Submit New Claim', () => {

  test('should successfully submit a new claim after validating SSN', async ({ page }) => {
    test.setTimeout(60000); // Increase the timeout to 60 seconds

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.login(testUsers.validUser.email, testUsers.validUser.password);
    await expect(page).toHaveURL('https://visionary-kangaroo-dfdd41.netlify.app/dashboard');

    // Navigate to claim form
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToClaimForm();

    // Fill out claim form
    const claimFormPage = new ClaimFormPage(page);
    await claimFormPage.validateSSN('123-45-6789');
    await claimFormPage.fillClaimForm(claimData);

    // Submit claim
    await claimFormPage.submitClaim();
    await expect(claimFormPage.successMessage).toBeVisible();
  });

});
