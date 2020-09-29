# Assert Action

Various assertions to aide in validating action outputs

---

## **Inputs**

### **`expected`**

**Required** Expected value

### **`actual`**

**Required** Actual value

### **`comparison`**

**Optional** Type of comparison to perform.  Supports "exact" (default), "startsWith", "endsWith", "contains", "notEqual"

---

## **Outputs**

### **`result`**

Various assertions to aide in validating action outputs

---

## **Examples**

### Example usage w/ exact (using default comparison) assertion

```yaml
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-invision@assert-action@v1
  with:
    expected: testing
    actual: ${{ steps.test-data.outputs.value }}
```

### Example usage w/ exact assertion

```yaml
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-invision@assert-action@v1
  with:
    expected: testing
    actual: ${{ steps.test-data.outputs.value }}
    comparison: exact
```

### Example usage w/ startsWith assertion

```yaml
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-invision@assert-action@v1
  with:
    expected: test
    actual: ${{ steps.test-data.outputs.value }}
    comparison: startsWith
```

### Example usage w/ endsWith assertion

```yaml
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-invision@assert-action@v1
  with:
    expected: ing
    actual: ${{ steps.test-data.outputs.value }}
    comparison: endsWith
```

### Example usage w/ contains assertion

```yaml
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-invision@assert-action@v1
  with:
    expected: est
    actual: ${{ steps.test-data.outputs.value }}
    comparison: endsWith
```

### Example usage w/ notEqual assertion

```yaml
- id: test-data
  run: echo "::set-output name=value::testing"
- uses: nick-invision@assert-action@v1
  with:
    expected: abc
    actual: ${{ steps.test-data.outputs.value }}
    comparison: notEqual
```

---

## **Limitations**

- If running on self-hosted runner, NodeJS must be installed.
