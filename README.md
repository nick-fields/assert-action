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

### Example usage w/ exact assertion

```yaml
- uses: nick-invision@assert-actionv1
  with:
    expected: ${{ secrets.REPO_TOKEN }}
    actual: ${{ steps.outputs }}
```

---

## **Limitations**

- If running on self-hosted runner, NodeJS must be installed.
