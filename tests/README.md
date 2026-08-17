# App detector validation

The validation runner executes the production `app-fingerprints.js` and
`app-detector.js` files in a JSDOM document. It does not reimplement matching,
confidence, or deduplication logic.

Run fixture coverage:

```sh
npm run test:apps
```

Run documented public storefront checks:

```sh
npm run test:apps:live
```

Run both, or choose a report destination:

```sh
npm run test:apps:all
node tests/run-validation.js --mode fixtures --output /tmp/app-results.json
```

Reports are JSON files in `test-results/` by default. Each result records the
expected and actual detection, confidence, matched signals, provenance, and
PASS/FAIL/INCONCLUSIVE state. `test-results/` is ignored by Git.

To add an app, keep the production fingerprint definition separate, then add:

1. a documented positive HTML fixture when publicly verifiable;
2. a negative expectation through the existing clean fixture and the positive
   case's all-other-apps assertion;
3. an entry in `fixtures/cases.json`; and
4. a public live case only when app usage can be established from an official
   demo, documentation, or an equivalent public source.

For an unsuccessful live check, run:

```sh
npm run investigate:apps -- test-results/validation-all.json
```

The investigation writes evidence and recommendations only. It never edits
`app-fingerprints.js` or the detector.
