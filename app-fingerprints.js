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
        match: '.smile-launcher, #smile-launcher, [data-smile-launcher]',
        strength: 'high',
        description: 'Smile.io loyalty launcher and container elements'
      },
      {
        // [class*="smile-"] alone is a generic substring match that can hit
        // unrelated markup (e.g. "smile-icon" from an unrelated component), so
        // it must not carry high confidence on its own.
        type: 'selector',
        match: '[class*="smile-"]',
        strength: 'weak',
        description: 'Generic "smile-" class prefix (not app-specific on its own)'
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
        // scriptDomain only receives the bare hostname (e.g. "cdn.jsdelivr.net"),
        // never the path, so a domain+path pattern here would never match. Use
        // scriptUrl, which is matched against the full lowercase <script src>.
        type: 'scriptUrl',
        match: /cdn\.jsdelivr\.net\/npm\/algoliasearch@/i,
        strength: 'high',
        description: 'Algolia SDK from CDN jsdelivr'
      },
      {
        type: 'scriptUrl',
        match: /unpkg\.com\/algoliasearch/i,
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
        match: /algolia.*instantsearch.*\.js/i,
        strength: 'high',
        description: 'Algolia InstantSearch library script'
      },
      {
        // InstantSearch CSS is a <link>, not a <script>, so it only ever shows
        // up in resourceUrls (populated from '[src], link[href]'), not scriptUrls.
        type: 'resourceUrl',
        match: /algolia.*instantsearch.*\.css/i,
        strength: 'high',
        description: 'Algolia InstantSearch stylesheet resource'
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
        // A bare "vitals.js"/"vitals-x.js" filename pattern was removed here:
        // it also matches Google's extremely common "web-vitals" performance
        // library (e.g. "web-vitals.iife.js"), which is unrelated to this app
        // and would produce false positives on unrelated storefronts.
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
  },
  {
    id: 'omnisend',
    name: 'Omnisend',
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)omnisnippet1\.com$/i,
        strength: 'high',
        description: 'Omnisend storefront launcher domain'
      },
      {
        type: 'scriptUrl',
        match: /omnisnippet1\.com\/inshop\/launcher(?:-v2)?\.js/i,
        strength: 'high',
        description: 'Omnisend in-shop launcher script'
      },
      {
        type: 'inlineScript',
        match: /OMNISEND-SNIPPET-SOURCE-CODE-V1|window\.omnisend\s*=\s*window\.omnisend\s*\|\|\s*\[\]/i,
        strength: 'high',
        description: 'Omnisend official tracking snippet marker'
      },
      {
        type: 'globalVar',
        match: 'omnisend',
        strength: 'weak',
        description: 'Omnisend event queue global'
      }
    ]
  },
  {
    id: 'tidio',
    name: 'Tidio',
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)code\.tidio\.co$/i,
        strength: 'high',
        description: 'Tidio chat loader domain'
      },
      {
        type: 'resourceUrl',
        match: /(?:code\.tidio\.co|widget\.tidiochat\.com)\//i,
        strength: 'high',
        description: 'Tidio chat resource or iframe URL'
      },
      {
        type: 'selector',
        match: '#tidio-chat, [data-tidio-chat], iframe[src*="tidiochat.com"]',
        strength: 'high',
        description: 'Tidio chat container or iframe'
      },
      {
        type: 'globalVar',
        match: 'tidioChatApi',
        strength: 'weak',
        description: 'Tidio chat API global'
      }
    ]
  },
  {
    id: 'reconvert-upsell-cross-sell',
    name: 'ReConvert Upsell & Cross Sell',
    // Verified live on two independent real storefronts (solgaard.co,
    // monstertransmission.com, both listed as ReConvert users by storeleads.app):
    // the vendor loads a sitewide script from its own reconvert-cdn.com domain and
    // defines several reconvertAjax*/script_reconvert globals, regardless of
    // whether a post-purchase/cart-upsell offer is shown on the current page.
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)reconvert-cdn\.com$/i,
        strength: 'high',
        description: 'ReConvert (Upsell.com) vendor-owned CDN domain'
      },
      {
        type: 'scriptUrl',
        match: /reconvert-cdn\.com\/assets\/js\/(?:reconvert_script_tags|store_reconvert_node)/i,
        strength: 'high',
        description: 'ReConvert storefront script tag script'
      },
      {
        type: 'globalVar',
        match: 'reconvertAjaxUrl',
        strength: 'high',
        description: 'ReConvert AJAX endpoint global'
      },
      {
        type: 'globalVar',
        match: 'script_reconvert',
        strength: 'medium',
        description: 'ReConvert script-tag initialization global'
      }
    ]
  },
  {
    id: 'stamped-product-reviews-ugc',
    name: 'Stamped Product Reviews & UGC',
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)cdn1\.stamped\.io$/i,
        strength: 'high',
        description: 'Stamped review widget CDN'
      },
      {
        type: 'scriptUrl',
        match: /cdn1\.stamped\.io\/files\/widget(?:\.min)?\.js/i,
        strength: 'high',
        description: 'Stamped main review widget script'
      },
      {
        type: 'selector',
        match: '#stamped-main-widget, .stamped-product-reviews, .stamped-badge, [data-stamped-widget]',
        strength: 'high',
        description: 'Stamped review widget markup'
      },
      {
        type: 'globalVar',
        match: 'StampedFn',
        strength: 'weak',
        description: 'Stamped widget initialization global'
      }
    ]
  },
  {
    id: 'instafeed',
    name: 'Instafeed',
    // Verified live on two independent real storefronts (dndgel.com, catwwr.com,
    // both linked as live Instafeed examples from minttstudio.com): the gallery
    // loads from the vendor's own cdn.nfcube.com domain and injects a Shopify app
    // block whose id contains "instafeed_app_block", plus "instafeed-" prefixed
    // globals/classes/data attributes that are distinct from generic Instagram embeds.
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)cdn\.nfcube\.com$/i,
        strength: 'high',
        description: 'Mintt Instafeed vendor-owned CDN domain (nfcube.com)'
      },
      {
        type: 'scriptUrl',
        match: /cdn\.nfcube\.com\/instafeed-/i,
        strength: 'high',
        description: 'Instafeed gallery script from nfcube CDN'
      },
      {
        type: 'selector',
        match: '.instafeed-shopify, [class*="instafeed-new-layout"], [data-instafeed-open-id], [id*="__instafeed_app_block_"]',
        strength: 'high',
        description: 'Instafeed Shopify app block and gallery DOM markers'
      },
      {
        type: 'globalVar',
        match: 'instafeedApp',
        strength: 'high',
        description: 'Instafeed application global object'
      },
      {
        type: 'globalVar',
        match: 'instafeedSettings',
        strength: 'medium',
        description: 'Instafeed gallery settings global'
      }
    ]
  },
  {
    id: 'shopify-inbox',
    name: 'Shopify Inbox',
    // Verified live on ironbullstrength.com: the <shopify-chat> custom element is
    // rendered natively with no separate network resource at page load, but a
    // distinctive inline JSON config script id ships alongside it.
    fingerprints: [
      {
        type: 'selector',
        match: '#ShopifyChat, shopify-chat',
        strength: 'high',
        description: 'Shopify Inbox chat web component root'
      },
      {
        type: 'selector',
        match: '#shopify-chat-app-embed-data',
        strength: 'high',
        description: 'Shopify Inbox app-embed configuration script'
      },
      {
        type: 'resourceUrl',
        match: /(?:inbox|chat)\.shopify(?:cdn)?\.com\//i,
        strength: 'high',
        description: 'Shopify Inbox chat resource URL'
      }
    ]
  },
  {
    id: '17track-order-tracking',
    name: '17TRACK Order Tracking',
    // Verified live on the official demo store (17track.myshopify.com/apps/
    // 17TRACK?nums=...): the current tracking-page widget is a Next.js app proxied
    // through the vendor's own shopify-proxy.17track.net domain rather than the
    // externalcall.js/YQV5 widget alone, so both generations of signals are kept.
    fingerprints: [
      {
        type: 'scriptUrl',
        match: /(?:www\.)?17track\.net\/externalcall\.js/i,
        strength: 'high',
        description: '17TRACK official tracking-widget script'
      },
      {
        type: 'scriptDomain',
        match: /(^|\.)shopify-proxy\.17track\.net$/i,
        strength: 'high',
        description: '17TRACK Shopify app-proxy tracking-page domain'
      },
      {
        type: 'scriptUrl',
        match: /shopify-proxy\.17track\.net\/trackpage-view\//i,
        strength: 'high',
        description: '17TRACK tracking-page app bundle'
      },
      {
        type: 'inlineScript',
        match: /\bYQV5\.track(?:Single|SingleF1|SingleF2)\s*\(/i,
        strength: 'high',
        description: '17TRACK YQV5 widget initialization'
      },
      {
        type: 'globalVar',
        match: 'YQV5',
        strength: 'weak',
        description: '17TRACK tracking-widget global'
      }
    ]
  },
  {
    id: 'pagefly-landing-page-builder',
    name: 'PageFly Landing Page Builder',
    fingerprints: [
      {
        type: 'inlineScript',
        match: /__pagefly_analytics_settings__/i,
        strength: 'high',
        description: 'PageFly storefront analytics configuration'
      },
      {
        type: 'selector',
        match: '.__pf[data-pf-type], .__pf [data-pf-type], [data-pf-type][class*="pf-"], .pf-c[data-pf-type]',
        strength: 'high',
        description: 'PageFly page-builder DOM structure'
      },
      {
        type: 'resourceUrl',
        match: /(?:cdn\.)?pagefly\.io\//i,
        strength: 'high',
        description: 'PageFly vendor-hosted resource'
      }
    ]
  },
  {
    id: 'ecomposer-landing-page-builder',
    name: 'EComposer Landing Page Builder',
    // Verified live on ecomposer.io itself, which is a real production Shopify
    // store (ecomposer-app.myshopify.com) dogfooding its own product: it loads
    // vendor-owned cdn.ecomposer.app runtime scripts, a Shopify checkout
    // extension at .../extensions/*/ecomposer-<id>/assets/*, EComposer* globals,
    // and "ecom-" prefixed element ids/classes for its editor-managed sections.
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)cdn\.ecomposer\.app$/i,
        strength: 'high',
        description: 'EComposer vendor-owned CDN domain'
      },
      {
        type: 'scriptUrl',
        match: /cdn\.ecomposer\.app\/vendors\/js\//i,
        strength: 'high',
        description: 'EComposer vendor-hosted runtime script'
      },
      {
        type: 'scriptUrl',
        match: /cdn\.shopify\.com\/extensions\/[^/]+\/ecomposer-\d+\/assets\//i,
        strength: 'high',
        description: 'EComposer Shopify checkout extension asset path'
      },
      {
        type: 'selector',
        match: '#ecom-global-css, #ecom-custom-css, #ecom-popup-data, #ecom-popup-script, #ecom-template-html, [class*="ecom-announcementbar"]',
        strength: 'medium',
        description: 'EComposer editor-managed section markup and style/script hooks'
      },
      {
        type: 'globalVar',
        match: 'EComposer',
        strength: 'high',
        description: 'EComposer runtime global object'
      },
      {
        type: 'globalVar',
        match: 'EComModal',
        strength: 'medium',
        description: 'EComposer modal component global'
      },
      {
        type: 'globalVar',
        match: 'EComPopup',
        strength: 'medium',
        description: 'EComposer popup component global'
      }
    ]
  },
  {
    id: 'replo',
    name: 'Replo',
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)(?:replocdn\.com|cdn\.replo\.app)$/i,
        strength: 'high',
        description: 'Replo page JavaScript CDN'
      },
      {
        type: 'resourceUrl',
        match: /(?:replocdn\.com|cdn\.replo\.app)\//i,
        strength: 'high',
        description: 'Replo vendor-hosted page resource'
      },
      {
        type: 'selector',
        match: '[data-replo-page], [data-replo-block], .replo-page',
        strength: 'high',
        description: 'Replo page-builder DOM marker'
      }
    ]
  },
  {
    id: 'releasit-cod-form-upsells',
    name: 'Releasit COD Form & Upsells',
    // Verified live on tiendafuji.store (real Releasit-using storefront, product
    // page): confirmed a Shopify checkout-extension asset path containing
    // "releasit-cod-form-<id>", distinctive "_RSI_"-prefixed globals, and
    // "rsi-" prefixed style/button element ids beyond the original GemPages-
    // specific hook selector already covered below.
    fingerprints: [
      {
        type: 'selector',
        match: '._rsi-cod-form-is-gempage, ._rsi-cod-form-gempages-button-hook, [class*="_rsi-cod-form"]',
        strength: 'high',
        description: 'Releasit COD form integration hook'
      },
      {
        type: 'scriptUrl',
        match: /cdn\.shopify\.com\/extensions\/[^/]+\/releasit-cod-form-\d+\/assets\//i,
        strength: 'high',
        description: 'Releasit Shopify checkout extension asset path'
      },
      {
        type: 'selector',
        match: '#rsi-visibility-styles, #rsi-force-show-buttons-style, ._rsi-buy-now-button-app-block-hook, #rsi_buy_now_button',
        strength: 'high',
        description: 'Releasit buy-now button app block hook and visibility styles'
      },
      {
        type: 'globalVar',
        match: '_RSI_COD_FORM_SETTINGS',
        strength: 'high',
        description: 'Releasit COD form settings global'
      },
      {
        type: 'globalVar',
        match: '_RSI_INITIAL_DATA',
        strength: 'medium',
        description: 'Releasit initial form data global'
      }
    ]
  },
  {
    id: 'microsoft-clarity',
    name: 'Microsoft Clarity',
    fingerprints: [
      {
        type: 'scriptUrl',
        match: /(?:www\.)?clarity\.ms\/tag\//i,
        strength: 'high',
        description: 'Microsoft Clarity tracking script'
      },
      {
        type: 'inlineScript',
        match: /clarity\.ms\/tag\/|\bclarity\s*\(\s*['\"]start['\"]\s*\)/i,
        strength: 'high',
        description: 'Microsoft Clarity official snippet'
      },
      {
        type: 'globalVar',
        match: 'clarity',
        strength: 'weak',
        description: 'Microsoft Clarity command global'
      }
    ]
  },
  {
    id: 'hotjar',
    name: 'Hotjar',
    fingerprints: [
      {
        type: 'scriptDomain',
        match: /(^|\.)(?:static|script)\.hotjar\.com$/i,
        strength: 'high',
        description: 'Hotjar tracking script domain'
      },
      {
        type: 'inlineScript',
        match: /(?:static|script)\.hotjar\.com\/c\/hotjar-|_hjSettings\s*=/i,
        strength: 'high',
        description: 'Hotjar tracking snippet configuration'
      },
      {
        type: 'globalVar',
        match: 'hj',
        strength: 'weak',
        description: 'Hotjar command global'
      }
    ]
  },
  {
    id: 'triple-whale',
    name: 'Triple Whale',
    // Verified live on tentree.com: the inline TriplePixel snippet reports to the
    // vendor's backend under the obfuscated domain config-security.com.
    fingerprints: [
      {
        type: 'inlineScript',
        match: /(?:window\.)?TriplePixelData\s*=|\bTriplePixel\s*\(/i,
        strength: 'high',
        description: 'Triple Whale Pixel configuration or API call'
      },
      {
        type: 'inlineScript',
        match: /config-security\.com/i,
        strength: 'high',
        description: 'Triple Whale Pixel backend endpoint domain'
      },
      {
        type: 'globalVar',
        match: 'TriplePixelData',
        strength: 'weak',
        description: 'Triple Whale Pixel data global'
      }
    ]
  },
  {
    id: 'printful',
    name: 'Printful',
    // Verified live on printful-demo-store.myshopify.com (product, collection, and
    // homepage all checked): the storefront loads a Printful-owned script (proxied
    // through Shopify's app proxy as cdn.shopify.com/proxy/<hash>/static.cdn.
    // printful.com/static/js/external/shopify-product-customizer.js) sitewide.
    // This reflects Printful's optional Product Personalizer embed rather than the
    // base product-sync/fulfillment integration, so its absence does not rule out
    // a basic Printful installation without that embed enabled (page/feature-specific).
    fingerprints: [
      {
        type: 'scriptUrl',
        match: /printful\.com\/static\/js\/external\/shopify-product-customizer/i,
        strength: 'high',
        description: 'Printful Product Personalizer/Customizer script (proxied via cdn.shopify.com)'
      }
    ]
  }
];
