#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const inputPath = process.argv[2] || path.join(__dirname, '..', 'test-results', 'validation-all.json');
if (!fs.existsSync(inputPath)) {
  throw new Error(`No validation report found at ${inputPath}. Run the validation runner first.`);
}

const report = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const needsReview = report.results.filter((result) => result.status !== 'PASS');
const investigation = {
  generatedAt: new Date().toISOString(),
  sourceReport: path.resolve(inputPath),
  findings: needsReview.map((result) => ({
    appId: result.appId,
    appName: result.appName,
    status: result.status,
    source: result.source,
    pageType: result.pageType,
    expectedDetection: result.expectedDetection,
    actualDetection: result.actualDetection,
    matchedSignals: result.matchedSignals,
    observedResources: result.pageEvidence?.resourceUrls || [],
    fetchedResources: result.fetchedResources || [],
    recommendation: result.status === 'INCONCLUSIVE'
      ? 'No fingerprint change is recommended. Test a page type where the app renders public storefront evidence, or use browser mode when dynamic rendering is required.'
      : result.falsePositive
        ? 'Review the matching signal against the fixture or storefront evidence. Narrow or downgrade only after confirming the signal is shared by unrelated implementations.'
        : 'Inspect the observed resources and DOM evidence. Propose the smallest additional app-specific fingerprint only when a vendor-owned, public signal is verified.'
  }))
};

const outputPath = path.join(path.dirname(inputPath), 'failure-investigation.json');
fs.writeFileSync(outputPath, `${JSON.stringify(investigation, null, 2)}\n`);
console.log(`FINDINGS: ${investigation.findings.length}`);
console.log(`REPORT: ${outputPath}`);
