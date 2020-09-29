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
        short:
          'Type of comparison to perform.  Supports "exact" (default), "startsWith", "endsWith", "contains", "notEqual"',
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
        title: 'Example usage w/ exact assertion',
        codeLanguage: 'yaml',
        codeBlock: `
- uses: nick-invision@assert-actionv1
  with:
    expected: \${{ secrets.REPO_TOKEN }}
    actual: \${{ steps.outputs }}
`.trim(),
      },
    ],
  },
  limitations: ['If running on self-hosted runner, NodeJS must be installed.'],
});
