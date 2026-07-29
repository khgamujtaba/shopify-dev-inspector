// This content script runs in the ISOLATED world.
// It has access to chrome APIs but NOT to the page's window.Shopify.
// It acts as a bridge between main-world.js and the popup.

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== 'get-store-info') {
    return;
  }

  // Set up a timeout so the popup never waits indefinitely on "Checking...".
  const responseTimeoutId = setTimeout(() => {
    // If we don't get a response in 2 seconds, assume Shopify is not available.
    window.removeEventListener('message', handleResponse);
    sendResponse({ isShopify: false });
  }, 2000);

  // Set up a listener for the response from main-world.js.
  const handleResponse = (event) => {
    // Only accept messages from this same window.
    if (event.source !== window) {
      return;
    }

    // Only accept SHOPIFY_RESPONSE messages.
    if (event.data?.type !== 'SHOPIFY_RESPONSE') {
      return;
    }

    // Clean up the timeout and listener after receiving the response.
    clearTimeout(responseTimeoutId);
    window.removeEventListener('message', handleResponse);

    // Extract the Shopify data from the response.
    const shopifyData = event.data.data;

    // Build the store information object.
    const storeInfo = buildStoreInfo(shopifyData);

    // Send the result back to the popup.
    sendResponse(storeInfo);
  };

  // Set up the listener before sending the request.
  window.addEventListener('message', handleResponse);

  // Request Shopify data from main-world.js.
  window.postMessage({ type: 'SHOPIFY_REQUEST' }, '*');

  // Return true to indicate we will respond asynchronously.
  return true;
});

// Build the store information object from Shopify data.
function buildStoreInfo(shopifyData) {
  if (!shopifyData || !shopifyData.themeName) {
    return { isShopify: false };
  }

  return {
    isShopify: true,
    themeName: shopifyData.themeName || 'Unknown',
    themeVersion: shopifyData.themeVersion || 'Not Available',
    language: shopifyData.language || shopifyData.locale || 'Not Available',
    currency: shopifyData.currencyCode || 'Not Available'
  };
}
