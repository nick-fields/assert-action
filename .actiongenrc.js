const { buildConfig } = require('action-gen');
module.exports = buildConfig({
  name: 'Assert Action',
  description: {
    short: 'Various assertions to aide in validating action outputs',
  },
  inputs: [
    {
      id: 'expected',
      description: {
        short: 'Expected value',
      },
      required: true,
    },
    {
      id: 'actual',
      description: {
        short: 'Actual value',
      },
      required: true,
    },
    {
      id: 'comparison',
      description: {
        short: 'Result of the comparison.  Can be either `passed` or `failed`',
      },
      required: false,
      default: 'exact',
    },
  ],
  outputs: [
    {
      id: 'result',
      description:
        'Result of the assertion.  Returns either "passed" or "failed',
    },
  ],
  runs: {
    using: 'node12',
    main: 'dist/index.js',
  },
  usage: {
    examples: [
      {
        title: 'Example usage w/ exact (using default comparison) assertion',
        codeLanguage: 'yaml',
        codeBlock: `
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-invision@assert-action@v1
  with:
    expected: testing
    actual: \${{ steps.test-data.outputs.value }}
`.trim(),
      },
      {
        title: 'Example usage w/ exact assertion',
        codeLanguage: 'yaml',
        codeBlock: `
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-invision@assert-action@v1
  with:
    expected: testing
    actual: \${{ steps.test-data.outputs.value }}
    comparison: exact
`.trim(),
      },
      {
        title: 'Example usage w/ startsWith assertion',
        codeLanguage: 'yaml',
        codeBlock: `
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-invision@assert-action@v1
  with:
    expected: test
    actual: \${{ steps.test-data.outputs.value }}
    comparison: startsWith
`.trim(),
      },
      {
        title: 'Example usage w/ endsWith assertion',
        codeLanguage: 'yaml',
        codeBlock: `
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-invision@assert-action@v1
  with:
    expected: ing
    actual: \${{ steps.test-data.outputs.value }}
    comparison: endsWith
`.trim(),
      },
      {
        title: 'Example usage w/ contains assertion',
        codeLanguage: 'yaml',
        codeBlock: `
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-invision@assert-action@v1
  with:
    expected: est
    actual: \${{ steps.test-data.outputs.value }}
    comparison: endsWith
`.trim(),
      },
      {
        title: 'Example usage w/ notEqual assertion',
        codeLanguage: 'yaml',
        codeBlock: `
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-invision@assert-action@v1
  with:
    expected: abc
    actual: \${{ steps.test-data.outputs.value }}
    comparison: notEqual
`.trim(),
      },
    ],
  },
  limitations: ['If running on self-hosted runner, NodeJS must be installed.'],
});
