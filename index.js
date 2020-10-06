const { getInput, setFailed, setOutput } = require('@actions/core');

const DEFAULT_COMPARISON = 'exact';
const SUPPORTED_COMPARISONS = [
  DEFAULT_COMPARISON,
  'notexact',
  'notequal',
  'startsWith',
  'notstartsWith',
  'endsWith',
  'notendsWith',
  'contains',
  'notcontains',
];

function throwAssertError(expected, actual, comparison) {
  const msg = `Expected '${actual}' to ${comparison} '${expected}'`;
  setOutput('result', 'failed');
  throw new Error(msg);
}

async function runAction() {
  const expected = getInput('expected');
  const actual = getInput('actual');
  const comparison = getInput('comparison') || DEFAULT_COMPARISON;

  if (
    !SUPPORTED_COMPARISONS.some(
      (c) => c.toLowerCase() === comparison.toLowerCase(),
    )
  ) {
    throw new Error(
      `Comparison input "${comparison}" not supported.  Supported: [${SUPPORTED_COMPARISONS.join(
        ',',
      )}]`,
    );
  }

  switch (comparison.toLowerCase()) {
    case 'exact':
    case 'equal':
      if (actual !== expected) {
        throwAssertError(expected, actual, 'equal');
      }
      break;
    case 'notequal':
    case 'notexact':
      if (actual === expected) {
        throwAssertError(expected, actual, 'not equal');
      }
      break;
    case 'startswith':
      if (!actual.startsWith(expected)) {
        throwAssertError(expected, actual, 'start with');
      }
      break;
    case 'notstartswith':
      if (actual.startsWith(expected)) {
        throwAssertError(expected, actual, 'not start with');
      }
      break;
    case 'endswith':
      if (!actual.endsWith(expected)) {
        throwAssertError(expected, actual, 'end with');
      }
      break;
    case 'notendswith':
      if (actual.endsWith(expected)) {
        throwAssertError(expected, actual, 'not end with');
      }
      break;
    case 'contains':
      if (!actual.includes(expected)) {
        throwAssertError(expected, actual, 'contain');
      }
      break;
    case 'notcontains':
      if (actual.includes(expected)) {
        throwAssertError(expected, actual, 'not contain');
      }
      break;
    default:
      throw new Error(
        `Comparison input ${comparison} supported but not yet implemented.`,
      );
  }

  setOutput('result', 'passed');
}

// this is dumb but makes it easier to test
if (!process.env.TEST_RUNNING) {
  runAction().catch((err) => {
    setFailed(err.message), setOutput('result', 'failed');
    process.exit(1);
  });
}

// only exported for testing purposes
module.exports = {
  runAction,
};
