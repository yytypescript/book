---
sidebar_label: Optional property của object type
---

# Optional property của object type

Trong TypeScript, để type cho optional property của object, thêm `?` sau tên property.

```ts twoslash
type Size = {
  width?: number;
};
```

Có thể gán object không có optional property cho object type có optional property.

```ts twoslash
type Size = {
  width?: number;
};
// ---cut---
const size: Size = {}; // OK
```

Cũng có thể gán object có giá trị optional property là `undefined`.

```ts twoslash
type Size = {
  width?: number;
};
// ---cut---
const size: Size = {
  width: undefined,
}; // OK
```

Tuy nhiên, không thể gán nếu giá trị optional property là `null`.

```ts twoslash
// @errors: 2322
type Size = {
  width?: number;
};
// ---cut---
const size: Size = {
  width: null,
};
```

Nhưng nếu tắt `strictNullChecks`, có thể gán `null`.

```ts twoslash title="Khi strictNullChecks là false"
// @strictNullChecks: false
type Size = {
  width?: number;
};
// ---cut---
const size: Size = {
  width: null,
};
```

## Thông tin liên quan

[Optional chaining](optional-chaining.md)

[strictNullChecks](../../../reference/tsconfig/strictnullchecks.md)
