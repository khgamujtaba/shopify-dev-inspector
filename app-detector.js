// Modular app detection engine using storefront fingerprints.
// This engine is intentionally separate from Shopify/theme detection.

const fingerprintMatchers = {
  scriptUrl: (pageData, pattern) =>
    pageData.scriptUrls.some((url) => pattern.test(url)),

  scriptDomain: (pageData, pattern) =>
    pageData.scriptDomains.some((domain) => pattern.test(domain)),

  // Includes stylesheets, iframe URLs, and other externally loaded resources.
  // This is intentionally separate from scriptUrl so a fingerprint can be as
  // narrow as the vendor's integration requires.
  resourceUrl: (pageData, pattern) =>
    pageData.resourceUrls.some((url) => pattern.test(url)),

  inlineScript: (pageData, pattern) =>
    pageData.inlineScripts.some((script) => pattern.test(script)),

  globalVar: (pageData, variableName) =>
    pageData.globals.some((globalName) => globalName === variableName),

  selector: (pageData, selector) => {
    try {
      return !!document.querySelector(selector);
    } catch (err) {
      return false;
    }
  },

  metaTag: (pageData, pattern) =>
    pageData.metaTags.some((content) => pattern.test(content))
};

function collectPageData() {
  const scriptUrls = Array.from(document.scripts)
    .map((script) => script.src)
    .filter(Boolean)
    .map((src) => src.toLowerCase());

  const scriptDomains = scriptUrls
    .map((url) => {
      try {
        const parsed = new URL(url);
        return parsed.hostname.toLowerCase();
      } catch (err) {
        return null;
      }
    })
    .filter(Boolean);

  const resourceUrls = Array.from(document.querySelectorAll('[src], link[href]'))
    .map((element) => element.src || element.href)
    .filter(Boolean)
    .map((url) => url.toLowerCase());

  const inlineScripts = Array.from(document.scripts)
    .filter((script) => !script.src)
    .map((script) => script.textContent || '');

  const globals = Object.keys(window || {}).filter(Boolean);

  const metaTags = Array.from(document.querySelectorAll('meta')).map((meta) =>
    (meta.content || '').toLowerCase()
  );

  return {
    scriptUrls,
    scriptDomains,
    resourceUrls,
    inlineScripts,
    globals,
    metaTags
  };
}

function evaluateFingerprint(pageData, fingerprint) {
  const matcher = fingerprintMatchers[fingerprint.type];
  if (!matcher) {
    return null;
  }

  const matched = matcher(pageData, fingerprint.match);
  return matched
    ? {
        type: fingerprint.type,
        description: fingerprint.description,
        strength: fingerprint.strength,
        matchedValue: fingerprint.type === 'globalVar' ? fingerprint.match : null
      }
    : null;
}

function determineConfidence(matchedSignals) {
  const highCount = matchedSignals.filter((signal) => signal.strength === 'high').length;
  const weakCount = matchedSignals.filter((signal) => signal.strength === 'weak').length;

  if (highCount >= 1) {
    return 'high';
  }

  if (weakCount >= 2) {
    return 'medium';
  }

  if (weakCount === 1) {
    return 'low';
  }

  return 'none';
}

window.detectShopifyApps = function () {
  const pageData = collectPageData();
  const appResults = {};

  // Process all fingerprint definitions
  for (const app of window.SHOPIFY_APP_FINGERPRINTS) {
    const matchedSignals = [];

    for (const fingerprint of app.fingerprints) {
      const matchResult = evaluateFingerprint(pageData, fingerprint);
      if (matchResult) {
        matchedSignals.push(matchResult);
      }
    }

    // Deduplicate by app ID: merge signals from multiple definitions
    if (appResults[app.id]) {
      // App already exists - merge matched signals
      appResults[app.id].matchedSignals.push(...matchedSignals);
    } else {
      // First time seeing this app
      appResults[app.id] = {
        id: app.id,
        name: app.name,
        matchedSignals
      };
    }
  }

  // Convert map back to array and recalculate confidence
  return Object.values(appResults).map((app) => {
    const confidence = determineConfidence(app.matchedSignals);
    const detected = confidence === 'high';

    return {
      id: app.id,
      name: app.name,
      detected,
      confidence,
      matchedSignals: app.matchedSignals
    };
  });
};
