function printSummary(summary) {
  console.log(`PASS: ${summary.pass}`);
  console.log(`FAIL: ${summary.fail}`);
  console.log(`INCONCLUSIVE: ${summary.inconclusive}`);
  console.log(`FALSE POSITIVE: ${summary.falsePositive}`);
}

module.exports = { printSummary };
