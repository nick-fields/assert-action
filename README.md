# Assert Action

Various assertions to aide in validating action outputs

**NOTE:** Ownership of this project was transferred to my personal account `nick-fields` from my work account `nick-invision`.  Details [here](#Ownership)

---

## **Inputs**

### **`expected`**

**Required** Expected value

### **`actual`**

**Required** Actual value

### **`comparison`**

**Optional** Type of comparison to perform. Supports `exact` (default), `startsWith`, `endsWith`, `contains`, `notEqual`, `notStartsWith`, `notEndsWith`, `notContains`

---

## **Outputs**

### **`result`**

Result of the comparison. Can be either passed or failed

---

## **Examples**

### Example usage w/ exact (using default comparison) assertion

```yaml
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-fields/assert-action@v1
  with:
    expected: testing
    actual: ${{ steps.test-data.outputs.value }}
```

### Example usage w/ exact assertion

```yaml
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-fields/assert-action@v1
  with:
    expected: testing
    actual: ${{ steps.test-data.outputs.value }}
    comparison: exact
```

### Example usage w/ startsWith assertion

```yaml
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-fields/assert-action@v1
  with:
    expected: test
    actual: ${{ steps.test-data.outputs.value }}
    comparison: startsWith
```

### Example usage w/ notStartsWith assertion

```yaml
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-fields/assert-action@v1
  with:
    expected: abc
    actual: ${{ steps.test-data.outputs.value }}
    comparison: notStartsWith
```

### Example usage w/ endsWith assertion

```yaml
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-fields/assert-action@v1
  with:
    expected: ing
    actual: ${{ steps.test-data.outputs.value }}
    comparison: endsWith
```

### Example usage w/ notEndsWith assertion

```yaml
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-fields/assert-action@v1
  with:
    expected: abc
    actual: ${{ steps.test-data.outputs.value }}
    comparison: notEndsWith
```

### Example usage w/ contains assertion

```yaml
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-fields/assert-action@v1
  with:
    expected: est
    actual: ${{ steps.test-data.outputs.value }}
    comparison: contains
```

### Example usage w/ notContains assertion

```yaml
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-fields/assert-action@v1
  with:
    expected: abc
    actual: ${{ steps.test-data.outputs.value }}
    comparison: notContains
```

### Example usage w/ notEqual assertion

```yaml
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-fields/assert-action@v1
  with:
    expected: abc
    actual: ${{ steps.test-data.outputs.value }}
    comparison: notEqual
```

---

## **Limitations**

- If running on self-hosted runner, NodeJS must be installed.

---

## **Ownership**

As of 2022/02/15 ownership of this project has been transferred to my personal account `nick-fields` from my work account `nick-invision` due to me leaving InVision.  I am the author and have been the primary maintainer since day one and will continue to maintain this as needed.

No immediate action is required if you rely on this as GitHub handles ownership transfers pretty well. Any current workflow reference to `nick-invision/assert-action@<whatever>` will still work, but will just pull from `nick-fields/assert-action@<whatever>` instead.  Who knows how long that will work, so at some point it would be beneficial to update your workflows to reflect the new owner accordingly.
