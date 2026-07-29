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
    // Extract only primitive values (no nested objects).
    const shopifyData = shopifyObj
      ? {
          themeName: shopifyObj.theme?.schema_name || shopifyObj.theme?.name || null,
          themeVersion: shopifyObj.theme?.schema_version || null,
          locale: shopifyObj.locale || null,
          language: shopifyObj.language || null,
          currencyCode: shopifyObj.currency?.code || shopifyObj.currency?.active || null
        }
      : null;

    // Send the data back to content.js.
    window.postMessage(
      {
        type: 'SHOPIFY_RESPONSE',
        data: shopifyData
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
