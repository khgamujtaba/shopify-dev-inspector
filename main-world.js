// This script runs in the MAIN world, inside the webpage's JavaScript environment.
// It has direct access to window.Shopify but NOT to chrome APIs.
// It communicates with content.js via window.postMessage().

// Listen for requests from content.js asking for Shopify data.
window.addEventListener('message', (event) => {
  // Only accept messages from this same window.
  if (event.source !== window) {
    return;
  }

  // Only respond to SHOPIFY_REQUEST messages.
  if (event.data?.type !== 'SHOPIFY_REQUEST') {
    return;
  }

  // Wait for window.Shopify to become available, checking every 100ms, timeout after 2 seconds.
  waitForShopify(2000).then((shopifyObj) => {
    // Detect Hydrogen/Oxygen first.
const hydrogenData = detectHydrogenOxygen();

// A Theme Store must expose a theme object.
const themeStoreData =
  shopifyObj?.theme
    ? {
        detectedPlatform: 'shopify-theme-store',
        platformLabel: 'Shopify Theme Store',
        isShopify: true,
        themeName: shopifyObj.theme.schema_name || shopifyObj.theme.name || null,
        themeVersion: shopifyObj.theme.schema_version || null,
        locale: shopifyObj.locale || null,
        language: shopifyObj.language || null,
        currencyCode: shopifyObj.currency?.code || shopifyObj.currency?.active || null
      }
    : null;

// Decide which platform to report.
const responseData =
  hydrogenData ||
  themeStoreData ||
  (shopifyObj
    ? {
        detectedPlatform: 'shopify-store',
        platformLabel: '🟦 Shopify Store',
        isShopify: true,
        themeName: null,
        themeVersion: null,
        language: detectLanguage(),
        currencyCode: detectCurrency()
      }
    : {
        detectedPlatform: 'not-shopify',
        platformLabel: '❌ Not a Shopify Store',
        isShopify: false
      });

    // Send the data back to content.js.
    window.postMessage(
      {
        type: 'SHOPIFY_RESPONSE',
        data: responseData
      },
      '*'
    );
  });
});

// Poll for window.Shopify to become available within the given timeout (in milliseconds).
// Returns the Shopify object if found, or null if the timeout is reached.
async function waitForShopify(timeoutMs) {
  const startTime = Date.now();
  const pollIntervalMs = 100;

  while (Date.now() - startTime < timeoutMs) {
    if (window.Shopify) {
      return window.Shopify;
    }
    // Wait 100ms before checking again.
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
  }

  // Timeout reached, Shopify did not become available.
  return null;
}

function detectHydrogenOxygen() {
  // Strong indicators that a storefront is using Hydrogen/Oxygen.
  const strongSignals = [];

  // 1. Official Hydrogen global objects.
  if (window.__HYDROGEN__ || window.__SHOPIFY_HYDROGEN__ || window.__oxygen__) {
    strongSignals.push('global-object');
  }

  // 2. Official Hydrogen generator meta tag.
  const generatorMeta = document.querySelector('meta[name="generator"]');
  if (generatorMeta?.content?.toLowerCase().includes('hydrogen')) {
    strongSignals.push('generator-meta');
  }

  // 3. Look for Hydrogen/Oxygen in JavaScript bundle URLs.
  const scriptUrls = Array.from(document.scripts)
    .map(script => script.src.toLowerCase());

  if (
    scriptUrls.some(url =>
      url.includes('hydrogen') ||
      url.includes('oxygen')
    )
  ) {
    strongSignals.push('script-url');
  }

  // 4. Look for Hydrogen/Oxygen in module preload URLs.
  const preloadUrls = Array.from(
    document.querySelectorAll('link[rel="modulepreload"], link[rel="preload"]')
  ).map(link => (link.href || '').toLowerCase());

  if (
    preloadUrls.some(url =>
      url.includes('hydrogen') ||
      url.includes('oxygen')
    )
  ) {
    strongSignals.push('module-preload');
  }

  // If no strong evidence exists, don't classify as Hydrogen.
  if (strongSignals.length === 0) {
    return null;
  }

  return {
    detectedPlatform: 'shopify-hydrogen',
    platformLabel: '🟣 Shopify Hydrogen/Oxygen',
    isShopify: true,
    themeName: 'Not Exposed',
    themeVersion: 'Not Exposed',
    language: detectLanguage() || 'Not Exposed',
    currencyCode: detectCurrency() || 'Not Exposed'
  };
}

function detectLanguage() {
  const candidates = [
    document.documentElement?.lang,
    document.querySelector('html[lang]')?.getAttribute('lang'),
    document.querySelector('meta[property="og:locale"]')?.content,
    document.querySelector('meta[name="language"]')?.content
  ];

  return candidates.find(Boolean) || null;
}

function detectCurrency() {
  const candidates = [
    document.querySelector('meta[name="currency"]')?.content,
    document.querySelector('meta[property="og:currency"]')?.content,
    document.querySelector('meta[name="shopify-currency"]')?.content
  ];

  return candidates.find(Boolean) || null;
}
