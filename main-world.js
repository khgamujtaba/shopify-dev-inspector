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
    const themeStoreData = shopifyObj
      ? {
          detectedPlatform: 'shopify-theme-store',
          platformLabel: 'Shopify Theme Store',
          isShopify: true,
          themeName: shopifyObj.theme?.schema_name || shopifyObj.theme?.name || null,
          themeVersion: shopifyObj.theme?.schema_version || null,
          locale: shopifyObj.locale || null,
          language: shopifyObj.language || null,
          currencyCode: shopifyObj.currency?.code || shopifyObj.currency?.active || null
        }
      : null;

    const responseData = themeStoreData || detectHydrogenOxygen() || {
      detectedPlatform: 'not-shopify',
      platformLabel: '❌ Not a Shopify Store',
      isShopify: false
    };

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
  const scriptSources = Array.from(document.scripts || [])
    .map((script) => (script.src || script.textContent || '').toLowerCase())
    .join(' ');
  const linkSources = Array.from(document.querySelectorAll('link[rel="modulepreload"], link[rel="preload"]'))
    .map((link) => (link.href || '').toLowerCase())
    .join(' ');
  const metaSources = Array.from(document.querySelectorAll('meta'))
    .map((meta) => `${meta.name || ''} ${meta.content || ''}`.toLowerCase())
    .join(' ');
  const sourceText = `${document.documentElement?.outerHTML || ''} ${scriptSources} ${linkSources} ${metaSources}`;

  const signals = [];

  if (/(hydrogen|oxygen)/i.test(sourceText)) {
    signals.push('runtime');
  }

  if (/(shopify.*(storefront|graphql|api)|storefront.*shopify)/i.test(sourceText)) {
    signals.push('storefront-api');
  }

  if (document.querySelector('meta[name="generator"][content*="Hydrogen"]')) {
    signals.push('meta-generator');
  }

  if (document.querySelector('meta[name="shopify-checkout-api-token"], meta[name="shopify-currency"]')) {
    signals.push('shopify-meta');
  }

  if (window.__HYDROGEN__ || window.__SHOPIFY_HYDROGEN__ || window.__oxygen__) {
    signals.push('global-object');
  }

  if (signals.length < 2) {
    return null;
  }

  return {
    detectedPlatform: 'shopify-hydrogen',
    platformLabel: '🟣 Shopify Hydrogen/Oxygen',
    isShopify: true,
    themeName: 'Not Exposed',
    themeVersion: 'Not Exposed',
    language: detectLanguage() || 'Not Exposed',
    currency: detectCurrency() || 'Not Exposed'
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
