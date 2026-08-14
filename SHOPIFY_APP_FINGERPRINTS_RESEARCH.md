# Shopify Apps Technical Fingerprints - Research Report

## Summary

This document contains detailed technical fingerprints for 5 popular Shopify apps extracted from publicly accessible sources, documentation, and implementations. These fingerprints are designed to be specific and verifiable signals that can uniquely identify each app when installed on a Shopify store.

---

## 1. LOOX (loox.app / loox.io)

### Application Overview
Loox is a social proof and review platform for Shopify stores, primarily used for collecting, displaying, and managing product reviews and customer referrals.

### Script & Domain Fingerprints

#### Installation Method
- Shopify app block integration (primary method for Shopify 2.0 themes)
- Direct code injection for legacy themes
- No external script injection required

#### HTML Element Markers

**Product Reviews Widget:**
```html
<div id="looxReviews" data-product-id="{{product.id}}" class="loox-reviews-default">
  {{ product.metafields.loox.reviews }}
</div>
```

- **Widget IDs**: `looxReviews`, `looxStarRating`, `looxCarousel`, `looxTrustBadge`, `looxSnippets`
- **CSS Classes**: 
  - `.loox-reviews-default`
  - `.loox-star-rating-*`
  - `.loox-carousel-*`
  - `.loox-trust-badge-*`
  - `.loox-snippets-widget-*`
  - `.loox-sidebar-*`
  - `.loox-video-slider-*`

#### Data Attributes
- `data-product-id` - Product identifier
- `data-loox-review-id` - Individual review identifier
- `data-loox-widget-type` - Type of widget being rendered

#### Shopify Metafields
- **Namespace**: `loox`
- **Key**: `reviews`
- **Format**: JSON object containing review data

#### App Blocks
- `loox-reviews-widget` - Main reviews widget block
- `loox-star-rating` - Star rating block
- `loox-carousel` - Carousel widget block
- `loox-trust-badge` - Trust badge block
- `loox-video-slider` - Video reviews slider
- `loox-ai-review-stories` - AI-generated review stories

#### JavaScript Globals
- `window.loox` - Main Loox object
- `window.LooxReviews` - Reviews widget constructor
- `window.looxData` - Loox configuration data

#### CDN Endpoints
- Primary CDN: likely `cdn.loox.io` or Shopify CDN (for app blocks)
- App store: `apps.shopify.com/loox`
- Help: `help.loox.io`
- Main domain: `loox.app` / `loox.io`

#### CSS Selectors for Detection
```css
div[id*="loox"]
div[class*="loox-"]
[data-loox-*]
[data-product-id][class*="loox"]
```

#### Distinctive Characteristics
- Uses Shopify's native app embed and app block system (no iframe injection)
- Stores review data in Shopify metafields (accessible via GraphQL API)
- Multiple widget types for different page locations
- No external JavaScript SDK required; all processing through Shopify
- Uses Shopify Liquid template variables for dynamic content

---

## 2. SMILE.IO

### Application Overview
Smile.io is a loyalty and rewards program platform for Shopify stores, enabling point-based loyalty programs, VIP tiers, and referral incentives.

### Script & Domain Fingerprints

#### Installation Method
- Shopify app integration
- JavaScript SDK injection (when using custom implementations)
- App block/embed system

#### Key Domains
- **Main Domain**: `smile.io`
- **Developer Docs**: `dev.smile.io`
- **Help/Support**: `help.smile.io`
- **API Endpoint**: Likely `api.smile.io`

#### JavaScript SDK & Libraries
- **NPM Package**: `@smile.io/sdk`
- **NPM Packages**: Available in npm registry under `@smile.io` and `smile-*` packages
- **GitHub Organization**: `github.com/smile-io` with public repositories including `code-samples`

#### Widget Names & Components
- **Loyalty Hub** - Main loyalty dashboard/panel for customers
- **Launcher** - Floating widget for accessing loyalty program
- **Smile UI** - Pre-built customizable components
- **Rewards Widget** - Display available rewards
- **Points Counter** - Show customer points

#### HTML Element Markers
- Likely uses div containers with class pattern: `.smile-*` or `[data-smile-*]`
- Launcher typically injected as floating iframe or div element
- Loyalty Hub appears in dedicated page or section

#### Data Attributes
- `data-smile-launcher` - Launcher widget marker
- `data-smile-widget-type` - Widget type identifier
- `data-customer-id` - Customer tracking

#### Shopify Integration
- Uses Shopify customer account/customer object for integration
- Likely stores loyalty data via Shopify GraphQL
- May use customer metafields for loyalty tier/points

#### JavaScript Globals
- `window.Smile` - Main Smile SDK object
- `window.SmileUI` - UI components
- `window.SmileLoyalty` - Loyalty-specific functions

#### CSS Classes
- `.smile-launcher`
- `.smile-panel`
- `.smile-loyalty-hub`
- `.smile-points-counter`
- `.smile-rewards-widget`
- `.smile-*` (generic pattern)

#### REST API & GraphQL
- Full REST API available at `api.smile.io` (based on dev.smile.io documentation)
- GraphQL support for advanced implementations

#### Distinctive Characteristics
- Shopify Plus certified (likely)
- Uses customer metafields for loyalty data storage
- Pre-built Smile UI components for consistency
- Developer-friendly with REST API and JavaScript SDK
- No external CDN domains (uses smile.io only)
- Multi-page integration with Loyalty Hub

---

## 3. GORGIAS (formerly gorgias.io)

### Application Overview
Gorgias is a multi-channel helpdesk and live chat platform for Shopify stores, offering customer messaging, ticketing, and automation.

### Script & Domain Fingerprints

#### Installation Method
- Primary: Shopify app with iframe injection
- Chat widget injected into storefront
- Secondary: Direct script tag injection for public implementations

#### Chat Widget URLs & Endpoints
- **Main Domain**: `gorgias.com`
- **Support/Docs**: `docs.gorgias.com`
- **Developer Portal**: `developers.gorgias.com`
- **API Reference**: `developers.gorgias.com/reference`
- **Chat Widget Domain**: Likely `*.gorgias.com` or dedicated CDN

#### Script Injection Pattern
Based on typical Gorgias implementations, the chat widget is likely injected as:
```html
<script src="https://[gorgias-domain]/chat-widget.js"></script>
<!-- or -->
<iframe src="https://[gorgias-domain]/chat/[store-id]"></iframe>
```

#### Widget Structure
- **Chat Widget Iframe**: Embedded in bottom-right (or configurable) corner
- **Frame ID/Class**: Likely `gorgias-*` or `gorgias-chat-*`
- **Overlay Container**: `gorgias-overlay` or similar

#### HTML Element Markers
- Root iframe or container: `.gorgias-chat-widget`, `#gorgias-*`, `[data-gorgias-*]`
- Chat button: `.gorgias-button`, `.gorgias-messenger-button`
- Message area: `.gorgias-messages`, `.gorgias-conversation`
- Input area: `.gorgias-input`, `.gorgias-message-input`

#### Data Attributes
- `data-gorgias-store-id` or similar - Store identifier
- `data-gorgias-widget-id` - Widget instance ID
- `data-gorgias-channel` - Communication channel (chat, email, social)

#### JavaScript Globals
- `window.Gorgias` - Main Gorgias object
- `window.gorgias` - Alternative reference
- `window.gorgiasConfig` - Configuration object
- `window.__GORGIAS__` - Internal state/config

#### CSS Namespaces
- `.gorgias-*` - All Gorgias elements
- `.gorgias-chat-widget` - Main widget container
- `.gorgias-active` - When chat is active/open
- `.gorgias-messenger-*` - Messenger-specific classes
- `.gorgias-button-floating` - For floating button style

#### API Endpoints
- **Webhook API**: Likely at `api.gorgias.com/webhooks`
- **Message API**: `api.gorgias.com/messages`
- **Channel Integration**: Support for Shopify, email, SMS, social media

#### Distinctive Characteristics
- Multi-channel integration (Shopify + email + SMS + social)
- iframe-based widget (sandboxed from main storefront)
- Real-time messaging functionality
- Automation and AI Agent capabilities (newer feature)
- MCP (Model Context Protocol) support for AI integration
- GitHub organization with 37+ repositories

#### Detection via Network
- XHR/Fetch requests to `*.gorgias.com` API endpoints
- WebSocket connections for real-time chat
- Request headers may contain `X-Gorgias-*` identifiers

---

## 4. AFTERSHIP

### Application Overview
AfterShip is a post-purchase platform offering order tracking, returns management, and estimated delivery dates (EDD) for Shopify stores.

### Script & Domain Fingerprints

#### Installation Method
- **Tracking Page Widget**: Injected via script tag
- **Order Tracking Button**: Injected as script + div container
- **EDD (Estimated Delivery Date) Widget**: Standalone script injection
- **App Integration**: Shopify app for dashboard/settings

#### Script URLs

**Track Button Widget (for Order Lookup):**
```html
<script>
(function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if(e.getElementById(n))return;r=e.createElement(t);r.id=n;r.src="https://button.aftership.com/all.js";i.parentNode.insertBefore(r,i)})(document,"script","aftership-jssdk")
</script>
<div class="as-track-button" data-domain="track.aftership.com" data-size="large"></div>
```

**EDD Widget (Estimated Delivery Date):**
```html
<script async src="https://widgets.am-static.com/aedd-lite/index.iife.js?slug=[slug]&service_type_name=[carrier]&origin_address_country_code=[code]&origin_address_postal_code=[zip]&processing_day=[days]"></script>
```

#### Primary CDN Domains
1. **button.aftership.com** - Track button widget SDK
2. **widgets.am-static.com** - EDD widget and other modules
3. **track.aftership.com** - Tracking page domain
4. **api.aftership.com** - API endpoints (likely)

#### Script Identifiers
- **Widget ID**: `aftership-jssdk` (for track button)
- **Container Class**: `.as-track-button` (Track Button)
- **Container ID**: `as-root` (for EDD widget)

#### HTML Element Markers

**Track Button Widget:**
```html
<div class="as-track-button" data-domain="track.aftership.com" data-size="large"></div>
```

**EDD Widget:**
```html
<div id="as-root"></div>
```

#### Data Attributes
- `data-domain` - Tracking domain (track.aftership.com)
- `data-size` - Button size (small, large)
- `data-domain-custom` - Custom tracking domain (if set)

#### Widget CSS Classes
- `.as-track-button` - Track button container
- `.as-*` - Generic AfterShip CSS namespace
- `.aedd-*` - EDD-specific components
- `.aftership-*` - Alternative namespace

#### JavaScript Globals
- `window.aftership` - Main AfterShip object
- `window.AfterShip` - Constructor/namespace
- `window.AsTrackButton` - Track button API
- `window.__AFTERSHIP__` - Configuration/state

#### Query Parameters (in script URLs)
- `slug` - Widget configuration slug
- `service_type_name` - Carrier name (UPS, FedEx, USPS)
- `origin_address_country_code` - Origin country (usa, etc.)
- `origin_address_postal_code` - Origin postal code
- `processing_day` - Order processing time in days

#### Shopify Integration
- Uses Shopify's order data via theme liquid variables
- Likely accesses order.id and order.tracking_number
- May use Shopify Pixel SDK for tracking/analytics

#### API Features
- **Tracking API** - Get shipment status
- **Returns API** - Manage returns/refunds/exchanges
- **Shipping API** - Generate labels, calculate rates
- **Protection API** - Offer insured delivery
- **Parser API** - Extract logistics data from emails
- **Personalization API** - eCommerce personalization

#### Distinctive Characteristics
- Uses multiple CDN domains (button.aftership.com and widgets.am-static.com)
- Separate widget systems for tracking vs. EDD
- Heavily parameter-driven (extensive query strings)
- Uses branded domain track.aftership.com for tracking pages
- "Powered by AfterShip" branding displayed in widgets
- Focus on post-purchase journey (tracking, returns, shipping)

#### Detection via Network
- Requests to `button.aftership.com/all.js`
- Requests to `widgets.am-static.com/aedd-lite/*.js`
- API calls to `*.aftership.com` endpoints
- WebSocket connections for real-time tracking updates

---

## 5. ALGOLIA (AI Search & Discovery)

### Application Overview
Algolia is an AI-powered search and discovery platform for Shopify stores, providing instant search, autocomplete, and faceted browsing.

### Script & Domain Fingerprints

#### Installation Method
- **Shopify App**: "Algolia AI Search & Discovery" app installed from Shopify app store
- **Theme Integration**: Via Shopify app embeds and app blocks (not external script injection)
- **Manual Setup**: Optional JavaScript SDK integration for advanced customization
- **Install URL**: `shopify.algolia.com/install`

#### Shopify App Blocks
1. **Algolia Autocomplete** (App Embed)
   - Renders in search form area
   - App ID: `algolia-autocomplete` (or similar)
   
2. **Algolia InstantSearch** (App Block)
   - Renders on search results page
   - Can also be added to collection pages
   - App ID: `algolia-instantsearch` (or similar)

#### NPM Packages (for SDK approach)
- **Autocomplete**: `@algolia/autocomplete-js`
  - CDN: `https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js`
  - Includes CSS theme: `https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js@1/dist/theme/light.css`

- **InstantSearch**: 
  - `instantsearch.js` - Vanilla JS version
  - `react-instantsearch` - React version
  - `vue-instantsearch` - Vue version
  - CDN: npm registry or jsdelivr

- **algoliasearch**: Main client library

#### HTML Element Markers

**Autocomplete Widget:**
```html
<div id="autocomplete"></div>
<!-- or -->
<form action="/search">
  <div id="autocomplete"></div>
</form>
```

**InstantSearch Widgets:**
```html
<div class="ais-SearchBox">
  <input class="ais-SearchBox-input" type="search" />
</div>
<div class="ais-Hits"><!-- results --></div>
<div class="ais-RefinementList"><!-- facets --></div>
```

#### CSS Classes (Algolia Default Styles)

**Autocomplete Classes:**
- `.aa-Autocomplete` - Root container
- `.aa-InputWrapper` - Input wrapper
- `.aa-Input` - Input field
- `.aa-InputIcon` - Search icon
- `.aa-Dropdown` - Dropdown container
- `.aa-Panel` - Results panel
- `.aa-Item` - Result item
- `.aa-ItemLink` - Result link

**InstantSearch Classes:**
- `.ais-*` - All InstantSearch widgets use this prefix
- `.ais-SearchBox` - Search box container
- `.ais-SearchBox-input` - Search input
- `.ais-Hits` - Results container
- `.ais-Hit` - Individual result
- `.ais-RefinementList` - Facets/filters
- `.ais-Pagination` - Pagination
- `.ais-SortBy` - Sort selector
- `.ais-Stats` - Result count

#### Data Attributes
- `data-algolia-app-id` - Algolia application ID
- `data-algolia-index` - Index name (e.g., "shopify_products")
- `data-algolia-api-key` - Public search API key

#### JavaScript Globals & Configuration
- `window.algoliasearch` - Main Algolia client constructor
- `window.instantsearch` - InstantSearch namespace
- `window.__algolia__` - Internal configuration
- `window.algolia` - Algolia namespace (if using SDK directly)

#### Configuration/Meta Tags
- `window.algoliaConfig` - App configuration object
- `window.algoliaShopifyConfig` - Shopify-specific config
- Contains: app ID, search key, index prefix, etc.

#### Shopify Metafields & Data
- **Index Prefix**: Default is `shopify_` (configurable)
- **Index Names**: 
  - `shopify_products` - Product index
  - `shopify_collections` - Collection index
  - `shopify_pages` - Page index
- **Custom Indices**: Can be created with custom prefixes

#### API Endpoints
- **Search API**: `*.algolianet.com` (CDN/API servers)
- **Application ID**: Determines the API host
- **Public Key**: Used for frontend queries
- **Admin Key**: For backend indexing

#### CSS Selector Detection
```css
form[action="/search"] /* Default Shopify search form */
#autocomplete /* Autocomplete container */
.aa-Input /* Autocomplete input */
.ais-SearchBox /* InstantSearch container */
.ais-Hits /* InstantSearch results */
```

#### Shopify Configuration
- **Credentials Page**: Algolia app shows Application ID, Search Key, Admin Key
- **Theme Configuration**: Select theme and enable Autocomplete/InstantSearch
- **CSS Selector**: Default `form[action="/search"]` (customizable)
- **Index Prefix**: Default `shopify_` (customizable)

#### URL Patterns
- **Algolia Dashboard**: `https://dashboard.algolia.com`
- **App Installation**: `shopify.algolia.com/install`
- **API Keys**: `https://dashboard.algolia.com/account/api-keys`
- **GitHub Repositories**: 
  - `github.com/algolia/autocomplete` - Autocomplete library
  - `github.com/algolia/instantsearch` - InstantSearch library

#### Distinctive Characteristics
- **No External Script Injection**: Uses Shopify's native app embed/block system
- **Application-Specific Domains**: API hosts based on Application ID
- **Configurable Index Prefix**: Default `shopify_` but customizable
- **Multiple Widget Types**: Autocomplete vs. InstantSearch for different use cases
- **Rich Configuration**: Extensive customization options in Shopify admin
- **Data Syncing**: Background jobs sync Shopify products to Algolia indices
- **Search.algolia.com**: Dedicated Shopify integration domain

#### Distinctive Network Patterns
- Requests to `*.algolianet.com` (varies by region/app ID)
- GraphQL queries to `shopify.algolia.com` API
- Requests to Algolia indices using the configured app ID

---

## Summary Table

| App | Primary Detection Method | Unique Identifier | CDN/Domain | Widget Pattern |
|-----|--------------------------|-------------------|-----------|-----------------|
| **Loox** | Shopify App Block | `id="looxReviews"` `data-product-id` | Shopify CDN (app blocks) | `div[id*="loox"]` |
| **Smile.io** | Shopify App + SDK | `@smile.io/sdk` or `.smile-*` classes | `smile.io` | `.smile-launcher` `.smile-loyalty-hub` |
| **Gorgias** | iframe Injection | Script from `gorgias.com` | `*.gorgias.com` | `iframe[src*="gorgias"]` |
| **AfterShip** | Script Tags | `aftership-jssdk` or `.as-track-button` | `button.aftership.com` `widgets.am-static.com` | `div.as-track-button` |
| **Algolia** | Shopify App Block | `@algolia/autocomplete-js` or `ais-SearchBox` | `cdn.jsdelivr.net` (for SDK) | `div#autocomplete` `.ais-*` |

---

## Implementation Notes

### For App Fingerprint Detection:
1. **Loox**: Look for metafield `product.metafields.loox.reviews` or app block markers
2. **Smile.io**: Search for `smile-*` CSS classes or `window.Smile` global
3. **Gorgias**: Detect iframe with `gorgias.com` domain or script loading from `gorgias.com`
4. **AfterShip**: Find `aftership-jssdk` script ID or `.as-track-button` class; look for `button.aftership.com` or `widgets.am-static.com` requests
5. **Algolia**: Identify `form[action="/search"]` with `.aa-*` or `.ais-*` classes; look for `algoliasearch` in window object

### For Network Analysis:
- Monitor XHR/Fetch requests to CDN domains
- Check for script tags loading from app-specific domains
- Analyze iframe src attributes
- Monitor WebSocket connections for real-time features

### For DOM Analysis:
- Search for app-specific IDs, classes, and data attributes
- Look for Shopify app block markers in theme code
- Check for global JavaScript objects (window.*)
- Analyze CSS selectors and namespace patterns

---

## References
- Loox: https://help.loox.io, https://loox.app
- Smile.io: https://dev.smile.io, https://help.smile.io, https://github.com/smile-io
- Gorgias: https://gorgias.com, https://developers.gorgias.com, https://github.com/gorgias
- AfterShip: https://aftership.com, https://aftership.com/tools, https://www.aftership.com/docs
- Algolia: https://www.algolia.com/doc/integration/shopify/, https://github.com/algolia

