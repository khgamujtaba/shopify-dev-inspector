const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const ROOT = `${__dirname}/..`;

function runDetector({ scripts = [], resources = [], selectors = [], globals = [] } = {}) {
  const selectorSet = new Set(selectors);
  const window = {};
  for (const globalName of globals) {
    window[globalName] = true;
  }

  const document = {
    scripts: scripts.map((script) =>
      typeof script === 'string' ? { src: script, textContent: '' } : script
    ),
    querySelector: (selector) => (selectorSet.has(selector) ? {} : null),
    querySelectorAll: (selector) => {
      if (selector === '[src], link[href]') {
        return resources.map((url) => ({ src: url, href: url }));
      }
      if (selector === 'meta') {
        return [];
      }
      return [];
    }
  };

  const context = vm.createContext({ window, document, URL });
  vm.runInContext(fs.readFileSync(`${ROOT}/app-fingerprints.js`, 'utf8'), context);
  vm.runInContext(fs.readFileSync(`${ROOT}/app-detector.js`, 'utf8'), context);
  return context.window.detectShopifyApps();
}

function detectedIds(options) {
  return Array.from(runDetector(options)
    .filter((app) => app.detected)
    .map((app) => app.id));
}

const targetFixtures = [
  ['omnisend', { scripts: [{ src: '', textContent: '/* OMNISEND-SNIPPET-SOURCE-CODE-V1 */' }] }],
  ['tidio', { resources: ['https://code.tidio.co/a1b2c3.js'] }],
  ['stamped-product-reviews-ugc', { scripts: ['https://cdn1.stamped.io/files/widget.min.js'] }],
  ['shopify-inbox', { selectors: ['#ShopifyChat, shopify-chat'] }],
  ['17track-order-tracking', { scripts: ['https://www.17track.net/externalcall.js'] }],
  ['pagefly-landing-page-builder', { selectors: ['.__pf[data-pf-type], .__pf [data-pf-type], [data-pf-type][class*="pf-"], .pf-c[data-pf-type]'] }],
  ['replo', { resources: ['https://replocdn.com/a/page.js'] }],
  ['releasit-cod-form-upsells', { selectors: ['._rsi-cod-form-is-gempage, ._rsi-cod-form-gempages-button-hook, [class*="_rsi-cod-form"]'] }],
  ['microsoft-clarity', { scripts: [{ src: '', textContent: 'https://www.clarity.ms/tag/abc123' }] }],
  ['hotjar', { scripts: [{ src: '', textContent: 'h._hjSettings={hjid:1,hjsv:6};' }] }],
  ['triple-whale', { scripts: [{ src: '', textContent: 'window.TriplePixelData = { TripleName: "shop.myshopify.com" };' }] }]
];

for (const [id, fixture] of targetFixtures) {
  assert.deepEqual(detectedIds(fixture), [id], `${id} should detect from its strong signal`);
}

const existingFixtures = [
  ['klaviyo', { scripts: ['https://static.klaviyo.com/onsite/js/klaviyo.js'] }],
  ['judge-me', { scripts: ['https://cdn.judge.me/widget_preload.js'] }],
  ['yotpo', { scripts: ['https://staticw2.yotpo.com/abc/widget.js'] }],
  ['recharge', { scripts: ['https://static.rechargecdn.com/static/js/recharge.js'] }],
  ['privy', { scripts: ['https://www.privy.com/widget.js'] }],
  ['vitals', { scripts: ['https://cdn.vitals.app/assets/app.js'] }],
  ['loox', { scripts: ['https://loox.io/widget.js'] }],
  ['smile', { scripts: ['https://smile.io/cdn/abc.js'] }],
  ['gorgias', { scripts: ['https://config.gorgias.com/assets/chat.js'] }],
  ['aftership', { scripts: ['https://button.aftership.com/jssdk.js'] }],
  ['algolia', { selectors: ['.ais-SearchBox, .ais-InstantSearch, [data-ais-index], .aa-Input, .aa-Autocomplete'] }]
];

for (const [id, fixture] of existingFixtures) {
  assert.deepEqual(detectedIds(fixture), [id], `${id} regression detection should remain intact`);
}

const simultaneous = detectedIds({
  scripts: [
    'https://www.17track.net/externalcall.js',
    'https://static.hotjar.com/c/hotjar-1.js'
  ],
  resources: ['https://code.tidio.co/a1b2c3.js']
});
assert.deepEqual(simultaneous, ['tidio', '17track-order-tracking', 'hotjar']);
assert.equal(new Set(simultaneous).size, simultaneous.length, 'apps must never be duplicated');

const noSignals = Array.from(runDetector());
assert.equal(noSignals.filter((app) => app.detected).length, 0, 'normal pages must not produce app hits');
assert.equal(noSignals.filter((app) => app.id === 'printful')[0].detected, false);

const requiredTargetIds = [
  'omnisend', 'tidio', 'reconvert-upsell-cross-sell', 'stamped-product-reviews-ugc',
  'instafeed', 'shopify-inbox', '17track-order-tracking', 'pagefly-landing-page-builder',
  'ecomposer-landing-page-builder', 'replo', 'releasit-cod-form-upsells', 'microsoft-clarity',
  'hotjar', 'triple-whale', 'printful'
];
assert.deepEqual(
  noSignals.slice(-15).map((app) => app.id),
  requiredTargetIds,
  'the product-selected app order must remain exact'
);
assert.equal(noSignals.length, 26, 'the original 11 app definitions must remain present');

console.log('app-detector fingerprint tests passed');
