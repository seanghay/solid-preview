import { launch } from "puppeteer-core";

const minimalArgs = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];


const exePath = process.platform === 'win32'
  ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  : process.platform === 'linux'
    ? '/usr/bin/google-chrome'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

let browser;
let defaultPage;

export async function init() {

  browser = await launch({
    headless: true,
    args: minimalArgs,
    executablePath: exePath,
    handleSIGINT: false,
    handleSIGTERM: false,
    handleSIGHUP: false
  })

  defaultPage = await browser.newPage();
  defaultPage.setDefaultTimeout(0)
  defaultPage.setDefaultNavigationTimeout(0)
}

export async function cleanup() {

  if (defaultPage) {
    await defaultPage.close()
  }

  if (browser) {
    await browser.close();
  }
}

export async function renderHtmlAsJpegBuffer(html) {

  if (!defaultPage || !browser) {
    await init()
  }

  defaultPage.setViewport({ width: 1200 / 2, height: 628 / 2, deviceScaleFactor: 2 })
  defaultPage.setContent(html);
  return defaultPage.screenshot({ type: 'jpeg', quality: 98 });
}

