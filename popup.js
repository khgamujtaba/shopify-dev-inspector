document.addEventListener('DOMContentLoaded', async () => {
  // Find the UI elements that will display tab information.
  const headlessMessage = document.getElementById('headless-message');
  const titleElement = document.getElementById('tab-title');
  const urlElement = document.getElementById('tab-url');
  const platformElement = document.getElementById('platform-status');
  const detailsContainer = document.getElementById('shopify-details');
  const themeNameElement = document.getElementById('theme-name');
  const themeVersionElement = document.getElementById('theme-version');
  const languageElement = document.getElementById('store-language');
  const currencyElement = document.getElementById('store-currency');
  const appDetectionsContainer = document.getElementById('app-detections');
  const appsListElement = document.getElementById('apps-list');

  // Stop early if the popup markup is missing.
  if (!titleElement || !urlElement || !platformElement || !detailsContainer || !appDetectionsContainer || !appsListElement) {
    return;
  }

  try {
    // Ask Chrome for the currently active tab in the current window.
    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    // Read the tab details from the browser API.
    const title = activeTab?.title || 'No title available';
    const url = activeTab?.url || 'No URL available';

    // Fill the popup with the tab's title and URL.
    titleElement.textContent = title;
    urlElement.textContent = url;

    // Show a temporary loading state while the content script checks the page.
    platformElement.textContent = 'Checking...';
    platformElement.classList.remove('status-shopify', 'status-not-shopify');
    detailsContainer.classList.add('hidden');

    // Try to detect Shopify on the current page, but don't fail if it's not possible.
    try {
      // Ask the content script for store information from the current page.
      const storeInfo = await chrome.tabs.sendMessage(activeTab.id, { type: 'get-store-info' });

      // Update the popup based on the structured response from the content script.
     if (storeInfo?.isShopify) {

    platformElement.textContent = storeInfo.platformLabel || 'Shopify';
    platformElement.classList.remove('status-shopify', 'status-not-shopify');
    platformElement.classList.add('status-shopify');

    // Hide everything first
    detailsContainer.classList.add('hidden');
    headlessMessage.classList.add('hidden');
    appDetectionsContainer.classList.add('hidden');
    appsListElement.innerHTML = '';

    // Shopify Theme Store
    if (storeInfo.detectedPlatform === 'shopify-theme-store') {
      detailsContainer.classList.remove('hidden');

      themeNameElement.textContent = storeInfo.themeName || 'Not Exposed';
      themeVersionElement.textContent = storeInfo.themeVersion || 'Not Exposed';
      languageElement.textContent = storeInfo.language || 'Not Exposed';
      currencyElement.textContent = storeInfo.currencyCode || 'Not Exposed';
    }

    // Shopify Hydrogen / Oxygen
    else if (storeInfo.detectedPlatform === 'shopify-hydrogen') {
      headlessMessage.classList.remove('hidden');
    }

    const detectedApps = (Array.isArray(storeInfo.apps) ? storeInfo.apps : []).filter((app) => app.detected);
    if (detectedApps.length > 0) {
      appDetectionsContainer.classList.remove('hidden');
      appsListElement.innerHTML = detectedApps
        .map((app) => `<span class="app-badge">${app.name}</span>`)
        .join('');
    }

  } else {

    platformElement.textContent = '❌ Not a Shopify Store';

    platformElement.classList.remove('status-shopify', 'status-not-shopify');
    platformElement.classList.add('status-not-shopify');

    detailsContainer.classList.add('hidden');
    headlessMessage.classList.add('hidden');
    appDetectionsContainer.classList.add('hidden');
    appsListElement.innerHTML = '';
  }
    } catch (shopifyError) {
      // If Shopify detection fails (e.g., on Chrome pages, new tab), mark as non-Shopify.
      console.log('Could not detect Shopify (this is normal on special pages):', shopifyError.message);
      platformElement.textContent = '❌ Not a Shopify Store';
      platformElement.classList.remove('status-shopify', 'status-not-shopify');
      platformElement.classList.add('status-not-shopify');
      detailsContainer.classList.add('hidden');
      appDetectionsContainer.classList.add('hidden');
      appsListElement.innerHTML = '';
    }
  } catch (error) {
    // Show a friendly message if something goes wrong getting the tab info.
    console.error('Could not inspect the current tab:', error);
    titleElement.textContent = 'Unable to load tab info';
    urlElement.textContent = 'Please try again';
    platformElement.textContent = '❌ Not a Shopify Store';
    platformElement.classList.remove('status-shopify', 'status-not-shopify');
    platformElement.classList.add('status-not-shopify');
    detailsContainer.classList.add('hidden');
  }
});
