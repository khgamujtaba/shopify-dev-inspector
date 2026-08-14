// Shopify app fingerprint definitions.
// Each app includes observable storefront signals.
// Detection is conservative: multiple independent signals increase confidence.

window.SHOPIFY_APP_FINGERPRINTS = [
  {
    id: 'klaviyo',
    name: 'Klaviyo',
    fingerprints: [
      {
        type: 'scriptUrl',
        match: /static\.klaviyo\.com\/onsite\/js\/klaviyo\.js/i,
        strength: 'high',
        description: 'Klaviyo storefront script URL'
      },
      {
        type: 'scriptDomain',
        match: /(^|\.)static\.klaviyo\.com$/i,
        strength: 'high',
        description: 'Klaviyo static asset domain'
      },
      {
        type: 'globalVar',
        match: 'Klaviyo',
        strength: 'weak',
        description: 'Klaviyo global object'
      },
      {
        type: 'selector',
        match: '[data-klaviyo-form]',
        strength: 'weak',
        description: 'Klaviyo form data attribute'
      }
    ]
  },
  {
    id: 'yotpo',
    name: 'Yotpo',
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)staticw2\.yotpo\.com$/i,
        strength: 'high',
        description: 'Yotpo static asset domain'
      },
      {
        type: 'scriptDomain',
        match: /(^|\.)cdn\.yotpo\.com$/i,
        strength: 'high',
        description: 'Yotpo CDN domain'
      },
      {
        type: 'scriptUrl',
        match: /(?:staticw2|cdn)\.yotpo\.(?:com|eu)\/.*\.js/i,
        strength: 'high',
        description: 'Yotpo script URL'
      },
      {
        type: 'selector',
        match: 'yotpo-widget, yotpo-bottomline, yotpo-main-widget, [data-yotpo]',
        strength: 'weak',
        description: 'Yotpo storefront widget or data attribute'
      },
      {
        type: 'globalVar',
        match: 'yotpo',
        strength: 'weak',
        description: 'Yotpo global object'
      }
    ]
  },
  {
    id: 'judge-me',
    name: 'Judge.me',
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)cdn\.judge\.me$/i,
        strength: 'high',
        description: 'Judge.me CDN domain'
      },
      {
        type: 'scriptDomain',
        match: /(^|\.)cdn1\.judge\.me$/i,
        strength: 'high',
        description: 'Judge.me CDN1 domain'
      },
      {
        type: 'scriptDomain',
        match: /(^|\.)api\.judge\.me$/i,
        strength: 'high',
        description: 'Judge.me API domain'
      },
      {
        type: 'scriptDomain',
        match: /(^|\.)judge\.me$/i,
        strength: 'high',
        description: 'Judge.me script domain'
      },
      {
        type: 'scriptUrl',
        match: /(?:cdn(?:1)?|api)\.judge\.me\/.*\.js/i,
        strength: 'high',
        description: 'Judge.me script or resource URL'
      },
      {
        type: 'globalVar',
        match: 'jdgmSettings',
        strength: 'high',
        description: 'Judge.me settings global object'
      },
      {
        type: 'selector',
        match: 'script[src*="cdn.judge.me"], script[src*="cdn1.judge.me"], script[src*="api.judge.me"]',
        strength: 'high',
        description: 'Judge.me script resource element'
      },
      {
        type: 'selector',
        match: '[href="shopify://apps/judge-me-reviews/"], [data-block-type*="judge-me-reviews"], [data-section-type*="judge-me-reviews"], [data-judge-me-reviews] ',
        strength: 'high',
        description: 'Judge.me Shopify app block marker'
      },
      {
        type: 'selector',
        match: '#jdgm-settings-script, #jdgm-settings-style, .jdgm-review-widget, .jdgm-widget, [data-jdgm]',
        strength: 'weak',
        description: 'Judge.me storefront widget or settings markup'
      },
      {
        type: 'globalVar',
        match: 'JudgeMe',
        strength: 'weak',
        description: 'Judge.me global object'
      }
    ]
  },
  {
    id: 'recharge',
    name: 'Recharge',
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)rechargeapps\.com$/i,
        strength: 'high',
        description: 'Recharge storefront script domain'
      },
      {
        type: 'scriptDomain',
        match: /(^|\.)static\.rechargecdn\.com$/i,
        strength: 'high',
        description: 'Recharge CDN domain'
      },
      {
        type: 'scriptUrl',
        match: /rechargeapps\.com\/.*\.js/i,
        strength: 'high',
        description: 'Recharge script URL'
      },
      {
        type: 'scriptUrl',
        match: /static\.rechargecdn\.com\/static\/js\/recharge\.js/i,
        strength: 'high',
        description: 'Recharge static CDN resource URL'
      },
      {
        type: 'selector',
        match: 'recharge-subscription, recharge-product-form, [data-recharge-widget], [data-recharge]',
        strength: 'weak',
        description: 'Recharge storefront widget or markup'
      },
      {
        type: 'globalVar',
        match: 'Recharge',
        strength: 'weak',
        description: 'Recharge global object'
      }
    ]
  },
  {
    id: 'privy',
    name: 'Privy',
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)privy\.com$/i,
        strength: 'high',
        description: 'Privy storefront script domain'
      },
      {
        type: 'scriptDomain',
        match: /(^|\.)privyassets\.com$/i,
        strength: 'high',
        description: 'Privy assets domain'
      },
      {
        type: 'scriptUrl',
        match: /privy(?:assets)?\.com\/.*\.js/i,
        strength: 'high',
        description: 'Privy script URL'
      },
      {
        type: 'selector',
        match: '[data-privy], .privy-popup, .privy, [class*="privy"]',
        strength: 'weak',
        description: 'Privy storefront widget or markup'
      },
      {
        type: 'globalVar',
        match: 'Privy',
        strength: 'weak',
        description: 'Privy global object'
      }
    ]
  }
  ,
  {
    id: 'loox',
    name: 'Loox',
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)loox\.(?:io|app)$/i,
        strength: 'high',
        description: 'Loox primary domain (loox.io or loox.app)'
      },
      {
        type: 'scriptUrl',
        match: /loox\.(?:io|app)\/.*\.(?:js|mjs)(?:\?.*)?/i,
        strength: 'high',
        description: 'Loox script URL from official domain'
      },
      {
        type: 'scriptUrl',
        match: /images\.loox\.io\/.*\.(?:js|gif|jpg|png)/i,
        strength: 'high',
        description: 'Loox CDN resource URLs (images.loox.io)'
      },
      {
        type: 'selector',
        match: '#looxReviews, [data-rwidget-id], .loox-reviews-container, [class*="loox-"]',
        strength: 'high',
        description: 'Loox review widget IDs and container selectors'
      },
      {
        type: 'selector',
        match: '.loox, .loox-widget, .loox-review, [data-loox]',
        strength: 'weak',
        description: 'Loox storefront widget or markup'
      },
      {
        type: 'globalVar',
        match: 'Loox',
        strength: 'weak',
        description: 'Loox global object'
      }
    ]
  },
  {
    id: 'smile',
    name: 'Smile.io',
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)smile\.io$/i,
        strength: 'high',
        description: 'Smile.io script domain'
      },
      {
        type: 'scriptUrl',
        match: /smile\.io\/.*\.(?:js|mjs)(?:\?.*)?/i,
        strength: 'high',
        description: 'Smile.io main script URL'
      },
      {
        type: 'scriptUrl',
        match: /smile\.io\/cdn\/([a-z0-9]+)\.js/i,
        strength: 'high',
        description: 'Smile.io CDN-hosted SDK script'
      },
      {
        type: 'selector',
        match: '.smile-launcher, #smile-launcher, [data-smile-launcher], [class*="smile-"]',
        strength: 'high',
        description: 'Smile.io loyalty launcher and container elements'
      },
      {
        type: 'selector',
        match: '.smile-rewards, .smile-points, [data-smile-widget], [data-smile]',
        strength: 'weak',
        description: 'Smile.io rewards and points display markup'
      },
      {
        type: 'globalVar',
        match: 'SmileLoyalty',
        strength: 'high',
        description: 'Smile.io global loyalty object'
      }
    ]
  },
  {
    id: 'gorgias',
    name: 'Gorgias',
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)gorgias\.com$/i,
        strength: 'high',
        description: 'Gorgias script domain'
      },
      {
        type: 'scriptUrl',
        match: /gorgias\.com\/assets\/.*\.(?:js|mjs)(?:\?.*)?/i,
        strength: 'high',
        description: 'Gorgias asset server script URL'
      },
      {
        type: 'selector',
        match: 'iframe[src*="gorgias.com"], iframe[data-gorgias-messenger]',
        strength: 'high',
        description: 'Gorgias chat iframe injected into page'
      },
      {
        type: 'selector',
        match: '[data-gorgias-messenger], .gorgias-launcher, #gorgias-chat',
        strength: 'high',
        description: 'Gorgias chat launcher and messenger container'
      },
      {
        type: 'selector',
        match: '.gorgias, .gorgias-chat, [data-gorgias]',
        strength: 'weak',
        description: 'Generic Gorgias widget markup'
      },
      {
        type: 'globalVar',
        match: 'Gorgias',
        strength: 'weak',
        description: 'Gorgias global object'
      }
    ]
  },
  {
    id: 'aftership',
    name: 'AfterShip',
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)aftership\.com$/i,
        strength: 'high',
        description: 'AfterShip API or CDN domain'
      },
      {
        type: 'scriptDomain',
        match: /(^|\.)button\.aftership\.com$/i,
        strength: 'high',
        description: 'AfterShip button widget CDN'
      },
      {
        type: 'scriptDomain',
        match: /(^|\.)widgets\.am-static\.com$/i,
        strength: 'high',
        description: 'AfterShip static widgets CDN'
      },
      {
        type: 'scriptUrl',
        match: /aftership.*jssdk.*\.js/i,
        strength: 'high',
        description: 'AfterShip JavaScript SDK script'
      },
      {
        type: 'selector',
        match: '#aftership-jssdk, [data-aftership-tracking], .aftership-tracking-widget',
        strength: 'high',
        description: 'AfterShip tracking widget and SDK element'
      },
      {
        type: 'selector',
        match: '.aftership, [data-aftership], .aftership-widget',
        strength: 'weak',
        description: 'AfterShip storefront widget or markup'
      },
      {
        type: 'globalVar',
        match: 'aftership',
        strength: 'weak',
        description: 'AfterShip global object'
      }
    ]
  },
  {
    id: 'algolia',
    name: 'Algolia',
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)cdn\.jsdelivr\.net\/npm\/algoliasearch@/i,
        strength: 'high',
        description: 'Algolia SDK from CDN jsdelivr'
      },
      {
        type: 'scriptDomain',
        match: /(^|\.)unpkg\.com\/algoliasearch/i,
        strength: 'high',
        description: 'Algolia SDK from unpkg CDN'
      },
      {
        type: 'scriptUrl',
        match: /algoliasearch.*\.(?:js|mjs)(?:\?.*)?/i,
        strength: 'high',
        description: 'Algoliasearch client library script'
      },
      {
        type: 'scriptUrl',
        match: /algolia.*instantsearch.*\.(?:js|css)/i,
        strength: 'high',
        description: 'Algolia InstantSearch library'
      },
      {
        type: 'selector',
        match: '.ais-SearchBox, .ais-InstantSearch, [data-ais-index], .aa-Input, .aa-Autocomplete',
        strength: 'high',
        description: 'Algolia InstantSearch or Autocomplete DOM containers'
      },
      {
        type: 'selector',
        match: '[data-algolia-index], [data-algolia-app-id], .algolia-search-box',
        strength: 'high',
        description: 'Algolia search widget data attributes'
      },
      {
        type: 'globalVar',
        match: 'algoliasearch',
        strength: 'medium',
        description: 'Algolia global search client object'
      },
      {
        type: 'globalVar',
        match: '__algolia',
        strength: 'medium',
        description: 'Algolia global configuration object'
      }
    ]
  },
  {
    id: 'vitals',
    name: 'Vitals',
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)vitals\.(?:app|co)$/i,
        strength: 'high',
        description: 'Vitals primary domain and subdomains (vitals.app, vitals.co)'
      },
      {
        type: 'scriptUrl',
        match: /cdn[-.\w]*\.vitals\.(?:app|co)\/.*\.(?:js|mjs)(?:\?.*)?/i,
        strength: 'high',
        description: 'Vitals CDN-hosted JS resources (cdn-*.vitals.app / vitals.co)'
      },
      {
        type: 'scriptUrl',
        match: /vitals(?:[._-]\w+)?\.(?:js|mjs)(?:\?.*)?/i,
        strength: 'high',
        description: 'JS filename containing "vitals" (vitals.js, vitals-client.js)'
      },
      {
        type: 'selector',
        match: '.vitals, [data-vitals], .vitals-badge, [data-vitals-app], [data-vitals-id]',
        strength: 'weak',
        description: 'Vitals storefront markup or data attributes'
      },
      {
        type: 'selector',
        match: '[href^="shopify://apps/vitals"], [data-section-type*="vitals"], [data-block-type*="vitals"], [data-app="vitals"]',
        strength: 'high',
        description: 'Shopify app block or embed markers referencing Vitals'
      },
      {
        type: 'globalVar',
        match: 'Vitals',
        strength: 'weak',
        description: 'Vitals global object'
      }
    ]
  }
];
