import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';

test('submit claim', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://visionary-kangaroo-dfdd41.netlify.app/');
  await loginPage.login('suryakumari.vayilapalli@sailssoftware.com', 'Surya@321');
  // ...additional test steps...
});
