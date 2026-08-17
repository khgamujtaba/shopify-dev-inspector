#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const { runProductionDetector } = require('./helpers/detector-runtime');
const { fetchLivePage } = require('./helpers/live-fetcher');
const { printSummary } = require('./helpers/result-reporter');

const ROOT = path.resolve(__dirname, '..');
const FIXTURES = path.join(__dirname, 'fixtures');
const fixtureManifest = JSON.parse(fs.readFileSync(path.join(FIXTURES, 'cases.json'), 'utf8'));
const liveManifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'cases/live-storefronts.json'), 'utf8'));
const args = process.argv.slice(2);
const mode = args[args.indexOf('--mode') + 1] || 'fixtures';
const outputFlag = args.indexOf('--output');
const outputPath = outputFlag >= 0
  ? path.resolve(process.cwd(), args[outputFlag + 1])
  : path.join(ROOT, 'test-results', `validation-${mode}.json`);

if (!['fixtures', 'live', 'all'].includes(mode)) {
  throw new Error('Use --mode fixtures, live, or all.');
}

function makeSummary() {
  return { pass: 0, fail: 0, inconclusive: 0, falsePositive: 0 };
}

function record(summary, status, isFalsePositive = false) {
  if (status === 'PASS') summary.pass += 1;
  if (status === 'FAIL') summary.fail += 1;
  if (status === 'INCONCLUSIVE') summary.inconclusive += 1;
  if (isFalsePositive) summary.falsePositive += 1;
}

function detectorMap(results) {
  return new Map(results.map((result) => [result.id, result]));
}

function evaluateExpected({ source, expectedAppId, expectedDetection, results, provenance, pageType, missingEvidenceState = 'FAIL' }) {
  const app = detectorMap(results).get(expectedAppId);
  const actualDetection = Boolean(app?.detected);
  let status = 'PASS';
  let falsePositive = false;

  if (expectedDetection !== actualDetection) {
    status = expectedDetection && missingEvidenceState === 'INCONCLUSIVE' ? 'INCONCLUSIVE' : 'FAIL';
    falsePositive = !expectedDetection && actualDetection;
  }

  return {
    appId: expectedAppId,
    appName: app?.name || expectedAppId,
    source,
    pageType,
    provenance,
    expectedDetection,
    actualDetection,
    confidence: app?.confidence || 'none',
    matchedSignals: app?.matchedSignals || [],
    status,
    falsePositive
  };
}

function assertCatalog(results) {
  const actualIds = results.map((app) => app.id);
  const expectedIds = fixtureManifest.requiredAppIds;
  if (
    actualIds.length !== expectedIds.length ||
    actualIds.some((appId) => !expectedIds.includes(appId)) ||
    expectedIds.some((appId) => !actualIds.includes(appId))
  ) {
    throw new Error('The production detector app catalog changed from the required 26-app manifest.');
  }
}

async function runFixtureCases(report) {
  for (const testCase of fixtureManifest.cases) {
    const fixturePath = path.join(FIXTURES, testCase.fixture);
    const html = fs.readFileSync(fixturePath, 'utf8');
    const source = { kind: 'fixture', fixture: testCase.fixture };
    const detector = runProductionDetector({ html, url: `https://fixture.test/${testCase.id}` });
    assertCatalog(detector.results);

    const expectedApps = testCase.expect === 'all-undetected'
      ? fixtureManifest.requiredAppIds.map((appId) => ({ appId, detected: false }))
      : fixtureManifest.requiredAppIds.map((appId) => ({ appId, detected: appId === testCase.appId }));

    for (const expectation of expectedApps) {
      const result = evaluateExpected({
        source,
        expectedAppId: expectation.appId,
        expectedDetection: expectation.detected,
        results: detector.results,
        provenance: testCase.provenance,
        pageType: testCase.pageType
      });
      record(report.summary, result.status, result.falsePositive);
      report.results.push(result);
    }

    if (testCase.expectSingleResultFor) {
      const matching = detector.results.filter((app) => app.id === testCase.expectSingleResultFor);
      const result = {
        appId: testCase.expectSingleResultFor,
        appName: matching[0]?.name || testCase.expectSingleResultFor,
        source,
        pageType: testCase.pageType,
        provenance: testCase.provenance,
        expectedDetection: true,
        actualDetection: matching.length === 1 && matching[0].detected,
        confidence: matching[0]?.confidence || 'none',
        matchedSignals: matching[0]?.matchedSignals || [],
        status: matching.length === 1 && matching[0].detected ? 'PASS' : 'FAIL',
        duplicateCheck: { expectedResultCount: 1, actualResultCount: matching.length }
      };
      record(report.summary, result.status);
      report.results.push(result);
    }
  }
}

async function runLiveCases(report) {
  for (const testCase of liveManifest.cases) {
    const source = { kind: 'live', url: testCase.url };
    try {
      const page = await fetchLivePage(testCase.url);
      if (!page.ok) {
        const result = {
          appId: testCase.appId,
          appName: testCase.appId,
          source,
          pageType: testCase.pageType,
          provenance: testCase.provenance,
          expectedDetection: true,
          actualDetection: false,
          confidence: 'none',
          matchedSignals: [],
          status: 'INCONCLUSIVE',
          reason: `Public fetch returned HTTP ${page.status}`,
          fetchedResources: page.resources
        };
        record(report.summary, result.status);
        report.results.push(result);
        continue;
      }

      const detector = runProductionDetector({ html: page.text, url: page.url });
      assertCatalog(detector.results);
      const result = evaluateExpected({
        source: { kind: 'live', url: page.url },
        expectedAppId: testCase.appId,
        expectedDetection: true,
        results: detector.results,
        provenance: testCase.provenance,
        pageType: testCase.pageType,
        missingEvidenceState: testCase.missingEvidenceState
      });
      result.fetchedResources = page.resources;
      result.pageEvidence = detector.pageEvidence;
      record(report.summary, result.status, result.falsePositive);
      report.results.push(result);
    } catch (error) {
      const result = {
        appId: testCase.appId,
        appName: testCase.appId,
        source,
        pageType: testCase.pageType,
        provenance: testCase.provenance,
        expectedDetection: true,
        actualDetection: false,
        confidence: 'none',
        matchedSignals: [],
        status: 'INCONCLUSIVE',
        reason: error.message
      };
      record(report.summary, result.status);
      report.results.push(result);
    }
  }
}

(async () => {
  const report = {
    generatedAt: new Date().toISOString(),
    mode,
    detectorFiles: ['app-fingerprints.js', 'app-detector.js'],
    summary: makeSummary(),
    results: []
  };
  if (mode === 'fixtures' || mode === 'all') await runFixtureCases(report);
  if (mode === 'live' || mode === 'all') await runLiveCases(report);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  printSummary(report.summary);
  console.log(`RESULTS: ${outputPath}`);
  process.exitCode = report.summary.fail > 0 ? 1 : 0;
})();
