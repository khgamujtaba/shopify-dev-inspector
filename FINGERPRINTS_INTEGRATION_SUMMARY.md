# Shopify Apps Fingerprints - Integration Summary

## Work Completed

### 1. Research Report
Created: `SHOPIFY_APP_FINGERPRINTS_RESEARCH.md`

A comprehensive markdown document containing detailed technical fingerprints for 5 popular Shopify apps:
- Loox (loox.app / loox.io)
- Smile.io
- Gorgias
- AfterShip
- Algolia

Each app includes:
- Application overview
- Script and domain fingerprints
- HTML element markers
- Data attributes
- Shopify metafields and integration patterns
- JavaScript globals and configuration
- CSS selectors and namespaces
- API endpoints
- Distinctive characteristics
- Detection methods

### 2. Updated app-fingerprints.js
Added 5 new app definitions to the existing fingerprints database:

#### Loox
- App blocks: `loox-reviews-widget`, `loox-star-rating`, `loox-carousel`, etc.
- Selectors: `#looxReviews`, `[class*="loox-"]`
- Metafield: `loox.reviews`
- Domains: `loox.app`, `loox.io`
- Globals: `window.loox`, `window.LooxReviews`

#### Smile.io
- App blocks: `smile-loyalty-hub`, `smile-launcher`, `smile-rewards-widget`
- Selectors: `.smile-launcher`, `.smile-loyalty-hub`, `.smile-points-counter`
- Domain: `smile.io`
- NPM: `@smile.io/sdk`
- Globals: `window.Smile`, `window.SmileUI`, `window.SmileLoyalty`

#### Gorgias
- Script domain: `gorgias.com`
- Selectors: `iframe[src*="gorgias.com"]`, `.gorgias-chat-widget`, `.gorgias-messenger-button`
- Globals: `window.Gorgias`, `window.__GORGIAS__`, `window.gorgiasConfig`
- Network detection: API calls to `gorgias.com` endpoints

#### AfterShip
- Script domains: `button.aftership.com`, `widgets.am-static.com`, `track.aftership.com`
- Script URLs: `button.aftership.com/all.js`, `widgets.am-static.com/aedd-lite`
- Script ID: `aftership-jssdk`
- Selectors: `.as-track-button`, `#as-root`, `[data-domain="track.aftership.com"]`
- Globals: `window.aftership`, `window.AfterShip`, `window.AsTrackButton`

#### Algolia
- App blocks: `algolia-autocomplete`, `algolia-instantsearch`
- Selectors: `#autocomplete`, `.aa-Autocomplete`, `.ais-SearchBox`, `.ais-Hits`
- Domain: `algolia.com`, `algolia.io`
- NPM packages: `@algolia/autocomplete-js`, `instantsearch.js`, `algoliasearch`
- Globals: `window.algoliasearch`, `window.instantsearch`, `window.__algolia__`
- Data attributes: `data-algolia-app-id`, `data-algolia-index`, `data-algolia-api-key`

## Key Findings by Category

### 1. Detection Mechanism Types

Each app uses different integration approaches:

| App | Primary Method | Detection Strength |
|-----|---|---|
| Loox | Shopify App Blocks + Metafields | Very High (no external CDN) |
| Smile.io | Shopify App + SDK | High (domain + SDK) |
| Gorgias | iframe Injection | High (iframe domain) |
| AfterShip | Script Tag Injection | Very High (multiple CDN domains) |
| Algolia | Shopify App Blocks + SDK | Very High (app blocks + CSS) |

### 2. CDN Domains

- **Loox**: None (uses Shopify CDN for app blocks)
- **Smile.io**: `smile.io`
- **Gorgias**: `gorgias.com`
- **AfterShip**: `button.aftership.com`, `widgets.am-static.com`, `track.aftership.com`
- **Algolia**: `algolia.com`, `algolia.io` (optional for SDK)

### 3. Unique Identifiers

All apps have high-confidence detection signals:
- CSS classes (app-specific namespace)
- Script IDs (`aftership-jssdk`)
- Data attributes (`data-loox-*`, `data-gorgias-*`)
- Global JavaScript objects
- Shopify metafields (Loox, Algolia)
- NPM package identifiers (Smile.io, Algolia)

### 4. Common Patterns

**Shopify-Native Integration** (Loox, Smile.io, Algolia):
- Use Shopify app blocks and embeds
- Store data in Shopify metafields when needed
- No external script injection required
- More secure and performant

**iframe-Based Integration** (Gorgias):
- Sandboxed widget via iframe
- Minimal DOM injection
- WebSocket support for real-time updates

**Script-Based Integration** (AfterShip):
- Multiple script injections
- Query parameter configuration
- Widget initialization via data attributes

## Files Created/Modified

1. **Created**: `SHOPIFY_APP_FINGERPRINTS_RESEARCH.md` (Detailed research report)
2. **Modified**: `app-fingerprints.js` (Added 5 new app fingerprints)

## Integration Notes for Developers

### Using the Fingerprints

The fingerprints are structured to support multiple detection strategies:

```javascript
// Example: Detect Loox
const isLooxInstalled = 
  document.getElementById('looxReviews') ||
  document.querySelector('[data-loox-widget-type]') ||
  window.LooxReviews ||
  document.querySelector('[class*="loox-"]');

// Example: Detect AfterShip
const isAftershipInstalled =
  document.getElementById('aftership-jssdk') ||
  document.querySelector('.as-track-button') ||
  window.AfterShip ||
  [...document.scripts].some(s => s.src?.includes('button.aftership.com'));

// Example: Detect Algolia
const isAlgoliaInstalled =
  document.querySelector('.aa-Autocomplete, .ais-SearchBox') ||
  window.algoliasearch ||
  window.instantsearch;
```

### Strength Ratings

- **high**: Strong confidence signal, low false-positive rate
- **medium**: Good confidence, some false-positive possibility
- **weak**: General indicator, may match unrelated libraries

## References

- Loox: https://help.loox.io, https://loox.app
- Smile.io: https://dev.smile.io, https://github.com/smile-io
- Gorgias: https://developers.gorgias.com, https://github.com/gorgias
- AfterShip: https://aftership.com/docs, https://www.aftership.com/tools
- Algolia: https://www.algolia.com/doc/integration/shopify/, https://github.com/algolia

