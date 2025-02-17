import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ClaimFormPage } from '../pages/claimFormPage';
import { testUsers, claimData } from '../data/testData';
import { DashboardPage } from '../pages/dashboardPage';
import { generateRandomSSN } from '../../utils/reusableMethods';

test.describe('Submit New Claim', () => {
  test.beforeEach(async ({ page }) => {  
    // Login
    const loginPage = new LoginPage(page);
    await loginPage.login(testUsers.validUser.email, testUsers.validUser.password);
    await expect(page).toHaveURL('https://visionary-kangaroo-dfdd41.netlify.app/dashboard');   
    
    // Navigate to claim form
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToClaimForm();
  });

  test('should successfully submit a new claim after validating SSN', async ({ page }) => {
    test.setTimeout(60000); // Increase the timeout to 60 seconds  

    // Fill out claim form
    const claimFormPage = new ClaimFormPage(page);
    const randomSSN = generateRandomSSN();
    await claimFormPage.validateSSN(randomSSN);
    
    await claimFormPage.fillClaimForm(claimData);
    // Submit claim
    await claimFormPage.submitClaim("Positive");
    await claimFormPage.navigateToDashboard();
  });

  test('should show error for invalid SSN', async ({ page }) => {
    const claimFormPage = new ClaimFormPage(page);

    // Test invalid SSN: all same digits
    await claimFormPage.validateSSN("111-11-1111");
    await claimFormPage.verifyErrorMessage("SSN cannot contain all the same digits");

    // Test invalid SSN: invalid area number
    await claimFormPage.validateSSN("000-00-0000");
    await claimFormPage.verifyErrorMessage("Invalid SSN: Area number (first three digits) is invalid");

    // Test invalid SSN: invalid group number
    await claimFormPage.validateSSN("123-00-2339");
    await claimFormPage.verifyErrorMessage("Invalid SSN: Group number (middle two digits) cannot be 00");
  });

  test('should show error for missing required fields', async ({ page }) => {
    const claimFormPage = new ClaimFormPage(page);
    const randomSSN = generateRandomSSN();
    await claimFormPage.validateSSN(randomSSN);
    
    // Leave out required fields
    // await claimFormPage.fillClaimForm({ ...claimData, requiredField: '' });
    // Attempt to submit claim
    await claimFormPage.submitClaim("Negative");
  });
});
