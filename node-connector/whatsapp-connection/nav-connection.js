import puppeteer from 'puppeteer';

let browserInstance = null;
let page = null;

export async function initConnection(headless) {
    browserInstance = await puppeteer.launch({executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless, defaultViewport: null, args: ['--start-maximized']});
    if (!headless) console.log('Browser launched.');
    page = await browserInstance.newPage();
    console.log('Connection initialized');
}

export async function OpenToURL(url)
{
   if(!page) throw new Error('Browser not initialized');
    await page.goto(url);
   console.log('Navigated to URL:', url);

}