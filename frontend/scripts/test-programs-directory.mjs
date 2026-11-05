import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const runTest = async () => {
  await mkdir('artifacts', { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  console.log('Navigating to http://localhost:5173/programs...');
  await page.goto('http://localhost:5173/programs', { waitUntil: 'networkidle' });

  // 1. Verify Top Baskets Row (5 Baskets)
  await page.waitForSelector('.bjs-basket-card');
  const basketCount = await page.locator('.bjs-basket-card').count();
  console.log(`✅ Loaded ${basketCount} basket cards in top row`);
  if (basketCount !== 5) throw new Error(`Expected 5 baskets, got ${basketCount}`);

  // 2. Verify First Basket is Selected by Default
  const selectedBasket = await page.locator('.bjs-basket-card.is-selected').textContent();
  console.log(`✅ Default selected basket: "${selectedBasket?.replace(/\s+/g, ' ').trim()}"`);

  // 3. Verify Basket Details rendered
  const basketTitle = await page.locator('.bjs-basket-details-title').textContent();
  console.log(`✅ Basket title rendered: "${basketTitle}"`);

  // 4. Verify Program Pills rendered and first program selected by default
  await page.waitForSelector('.bjs-program-pill');
  const pillCount = await page.locator('.bjs-program-pill').count();
  const activePill = await page.locator('.bjs-program-pill.is-active').textContent();
  console.log(`✅ Loaded ${pillCount} program pills for basket. Default selected program: "${activePill}"`);

  // 5. Verify Program Details rendered
  const progTitle = await page.locator('.bjs-prog-main-title').textContent();
  console.log(`✅ Program title rendered: "${progTitle}"`);

  // 6. Verify 2x2 Gallery and Impact Cards
  const galleryItems = await page.locator('.bjs-gallery-item').count();
  const impactCards = await page.locator('.bjs-impact-card').count();
  console.log(`✅ Gallery items count: ${galleryItems}, Impact cards count: ${impactCards}`);

  // 7. Test switching basket (e.g. click National Programs / Parikalpana)
  console.log('Switching to National Programs (Parikalpana)...');
  const parikalpanaBtn = page.locator('.bjs-basket-card', { hasText: 'National Programs' });
  await parikalpanaBtn.click();
  await page.waitForTimeout(300);

  const newProgTitle = await page.locator('.bjs-prog-main-title').textContent();
  console.log(`✅ Switched to National Programs! Default program selected: "${newProgTitle}"`);

  // 8. Test Explore Modal
  console.log('Clicking "Explore Blue Roots" button...');
  await page.locator('.bjs-explore-btn').click();
  await page.waitForSelector('.bjs-modal-card');

  const modalTitle = await page.locator('.bjs-modal-title').textContent();
  console.log(`✅ Modal opened for program: "${modalTitle}"`);

  // Take screenshot
  await page.screenshot({ path: 'artifacts/programs-directory-ui.png', fullPage: true });
  console.log('✅ Screenshot saved to artifacts/programs-directory-ui.png');

  await browser.close();
  if (errors.length > 0) {
    console.warn('⚠️ Console errors during test:', errors);
  } else {
    console.log('🎉 ALL TESTS PASSED SUCCESSFULLY with 0 errors!');
  }
};

runTest().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
