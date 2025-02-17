import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ClaimFormPage } from '../pages/claimFormPage';
import { testUsers, claimData } from '../data/testData';
import { DashboardPage } from '../pages/dashboardPage';
import { generateRandomSSN } from '../../utils/reusableMethods';

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
    const randomSSN = generateRandomSSN();
    await claimFormPage.validateSSN(randomSSN);
    
    await claimFormPage.fillClaimForm(claimData);
    // Submit claim
    await claimFormPage.submitClaim();
  
  });

  test('should show error for invalid SSN', async ({ page }) => {
    // Login
    const loginPage = new LoginPage(page);
    await loginPage.login(testUsers.validUser.email, testUsers.validUser.password);
    await expect(page).toHaveURL('https://visionary-kangaroo-dfdd41.netlify.app/dashboard');

    // Navigate to claim form
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToClaimForm();

    // Fill out claim form with invalid SSN
    const claimFormPage = new ClaimFormPage(page);
    const invalidSSN = "000-00-0000"; // Invalid SSN
    await claimFormPage.validateSSN(invalidSSN);
    
    await claimFormPage.fillClaimForm(claimData);
    // Attempt to submit claim
    await claimFormPage.submitClaim();

    // Verify error message
    await expect(claimFormPage.Elements.errorMessage).toBeVisible();
  });

  test('should show error for missing required fields', async ({ page }) => {
    // Login
    const loginPage = new LoginPage(page);
    await loginPage.login(testUsers.validUser.email, testUsers.validUser.password);
    await expect(page).toHaveURL('https://visionary-kangaroo-dfdd41.netlify.app/dashboard');

    // Navigate to claim form
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToClaimForm();

    // Fill out claim form with missing required fields
    const claimFormPage = new ClaimFormPage(page);
    const randomSSN = generateRandomSSN();
    await claimFormPage.validateSSN(randomSSN);
    
    // Leave out required fields
    await claimFormPage.fillClaimForm({ ...claimData, requiredField: '' });
    // Attempt to submit claim
    await claimFormPage.submitClaim();

    // Verify error message
    await expect(claimFormPage.Elements.errorMessage).toBeVisible();
  });

});
