const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '../..');
const FINGERPRINTS = fs.readFileSync(path.join(ROOT, 'app-fingerprints.js'), 'utf8');
const DETECTOR = fs.readFileSync(path.join(ROOT, 'app-detector.js'), 'utf8');

function runProductionDetector({ html, url, globals = [] }) {
  const dom = new JSDOM(html, {
    url,
    runScripts: 'outside-only'
  });
  const { window } = dom;

  for (const globalName of globals) {
    window[globalName] = true;
  }

  const context = dom.getInternalVMContext();
  vm.runInContext(FINGERPRINTS, context, { filename: 'app-fingerprints.js' });
  vm.runInContext(DETECTOR, context, { filename: 'app-detector.js' });

  const results = Array.from(window.detectShopifyApps()).map((app) => ({
    id: app.id,
    name: app.name,
    detected: app.detected,
    confidence: app.confidence,
    matchedSignals: Array.from(app.matchedSignals, (signal) => ({ ...signal }))
  }));

  const pageEvidence = {
    scriptUrls: Array.from(window.document.scripts, (script) => script.src).filter(Boolean),
    resourceUrls: Array.from(window.document.querySelectorAll('[src], link[href]'), (element) => element.src || element.href).filter(Boolean),
    inlineScriptCount: Array.from(window.document.scripts).filter((script) => !script.src).length
  };

  dom.window.close();
  return { results, pageEvidence };
}

module.exports = { runProductionDetector };
