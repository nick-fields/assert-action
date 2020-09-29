const actions = require('@actions/core');

actions.setOutput = jest.fn();
actions.setFailed = jest.fn();

const { runAction } = require('../index');

const EXPECTED_INPUT_NAME = 'INPUT_EXPECTED';
const ACTUAL_INPUT_NAME = 'INPUT_ACTUAL';
const COMPARISON_INPUT_NAME = 'INPUT_COMPARISON';

const DEFAULT_EXPECTED = 'testing';
const DEFAULT_ACTUAL = 'testing';
const DEFAULT_COMPARISON = 'exact';

//helpers
const mockExpected = (expected) =>
  (process.env[EXPECTED_INPUT_NAME] = expected);
const mockActual = (actual) => (process.env[ACTUAL_INPUT_NAME] = actual);
const mockComparison = (comparison) =>
  (process.env[COMPARISON_INPUT_NAME] = comparison);

describe('runAction', () => {
  beforeEach(() => {
    mockExpected(DEFAULT_EXPECTED);
    mockActual(DEFAULT_ACTUAL);
    mockComparison(DEFAULT_COMPARISON);
  });

  describe('exact', () => {
    const failTests = [
      DEFAULT_EXPECTED.toUpperCase(),
      DEFAULT_EXPECTED.slice(0, -1),
      DEFAULT_EXPECTED.substring(1),
      'something totally different',
    ];

    it('success when defaults to exact', async () => {
      delete process.env[COMPARISON_INPUT_NAME];
      await runAction();

      expect(actions.setOutput).toHaveBeenCalledWith('result', 'passed');
    });

    it('success when exact', async () => {
      await runAction();

      expect(actions.setOutput).toHaveBeenCalledWith('result', 'passed');
    });

    for (const test of failTests) {
      it(`fails when defaults to exact and ${test} does not match actual ${DEFAULT_ACTUAL}`, async () => {
        delete process.env[COMPARISON_INPUT_NAME];
        let thrownErr;
        mockExpected(test);

        try {
          await runAction();
        } catch (error) {
          thrownErr = error.message;
        }

        expect(actions.setOutput).toHaveBeenCalledWith('result', 'failed');
        expect(thrownErr).toContain('Expected', 'to equal');
      });
      it(`fails when ${test} does not match actual ${DEFAULT_ACTUAL}`, async () => {
        let thrownErr;
        mockExpected(test);

        try {
          await runAction();
        } catch (error) {
          thrownErr = error.message;
        }

        expect(actions.setOutput).toHaveBeenCalledWith('result', 'failed');
        expect(thrownErr).toContain('Expected', 'to equal');
      });
    }
  });

  describe('startsWith', () => {
    beforeEach(() => {
      mockComparison('startsWith');
    });
    const failTests = [
      // casing
      DEFAULT_EXPECTED.toUpperCase().slice(0, 4),
      // first char missing
      DEFAULT_EXPECTED.substring(1),
      // total mismatch
      'something totally different',
    ];

    it('success when startsWith', async () => {
      mockExpected(DEFAULT_EXPECTED.substring(0, 4));
      await runAction();

      expect(actions.setOutput).toHaveBeenCalledWith('result', 'passed');
    });

    for (const test of failTests) {
      it(`fails when ${DEFAULT_ACTUAL} does not start with ${test}`, async () => {
        let thrownErr;
        mockExpected(test);

        try {
          await runAction();
        } catch (error) {
          thrownErr = error.message;
        }

        expect(actions.setOutput).toHaveBeenCalledWith('result', 'failed');
        expect(thrownErr).toContain('Expected', 'to start with');
      });
    }
  });

  describe('endsWith', () => {
    const comparison = 'endsWith';
    const expected = 'esting';
    const actual = 'testing';
    beforeEach(() => {
      mockComparison(comparison);
      mockExpected(expected);
      mockActual(actual);
    });
    const failTests = [
      // casing
      expected.toUpperCase(),
      // last char missing
      expected.substring(1, -2),
      // total mismatch
      'something totally different',
    ];

    it(`success when ${actual} ${comparison} ${expected}`, async () => {
      await runAction();

      expect(actions.setOutput).toHaveBeenCalledWith('result', 'passed');
    });

    for (const test of failTests) {
      it(`fails when ${actual} does not ${comparison} ${test}`, async () => {
        let thrownErr;
        mockExpected(test);

        try {
          await runAction();
        } catch (error) {
          thrownErr = error.message;
        }

        expect(actions.setOutput).toHaveBeenCalledWith('result', 'failed');
        expect(thrownErr).toContain('Expected', 'to end with');
      });
    }
  });

  describe('contains', () => {
    const comparison = 'contains';
    const expected = 'esti';
    const actual = 'testing';

    beforeEach(() => {
      mockComparison(comparison);
      mockExpected(expected);
      mockActual(actual);
    });

    const passTests = [
      // starts with
      'tes',
      // ends with
      'ing',
      // middle
      'est',
      // whole
      'testing',
    ];

    const failTests = [
      // casing
      expected.toUpperCase(),
      // some chars missing
      'tesng',
      // total mismatch
      'something totally different',
    ];

    for (const test of passTests) {
      it(`success when ${actual} ${comparison} ${test}`, async () => {
        mockExpected(test);
        await runAction();

        expect(actions.setOutput).toHaveBeenCalledWith('result', 'passed');
      });
    }

    for (const test of failTests) {
      it(`fails when ${actual} does not ${comparison} ${test}`, async () => {
        let thrownErr;
        mockExpected(test);

        try {
          await runAction();
        } catch (error) {
          thrownErr = error.message;
        }

        expect(actions.setOutput).toHaveBeenCalledWith('result', 'failed');
        expect(thrownErr).toContain('Expected', 'to end with');
      });
    }
  });

  describe('notequal', () => {
    const comparison = 'notEqual';
    const actual = 'testing';

    beforeEach(() => {
      mockComparison(comparison);
      mockActual(actual);
    });

    const passTests = [
      // starts with
      'tes',
      // ends with
      'ing',
      // middle
      'est',
      // whole
      'TESTING',
    ];

    const failTests = [
      // exact
      actual,
    ];

    for (const test of passTests) {
      it(`success when ${actual} ${comparison} ${test}`, async () => {
        mockExpected(test);
        await runAction();

        expect(actions.setOutput).toHaveBeenCalledWith('result', 'passed');
      });
    }

    for (const test of failTests) {
      it(`fails when ${actual} does not ${comparison} ${test}`, async () => {
        let thrownErr;
        mockExpected(test);

        try {
          await runAction();
        } catch (error) {
          thrownErr = error.message;
        }

        expect(actions.setOutput).toHaveBeenCalledWith('result', 'failed');
        expect(thrownErr).toContain('Expected', 'not equal');
      });
    }
  });
});
