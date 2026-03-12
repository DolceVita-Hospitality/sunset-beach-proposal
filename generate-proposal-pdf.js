const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, 'index.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 60000 });

  // Wait for fonts and images to load
  await page.evaluateHandle('document.fonts.ready');

  await page.pdf({
    path: path.resolve(__dirname, 'SUNSET_BEACH_PROPOSAL.pdf'),
    landscape: true,
    preferCSSPageSize: true,
    printBackground: true,
    displayHeaderFooter: false,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm'
    }
  });

  console.log('Proposal PDF generated successfully.');
  await browser.close();
})();
