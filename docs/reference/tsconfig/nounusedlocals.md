# noUnusedLocals

**リリースされたバージョン: 2.0**

宣言したにもかかわらず使用されていない変数を禁止します。

```typescript
function add(n1: number, n2: number): number {
  const message: string = `the sum is ${n1 + n2}`;

  return n1 + n2;
}
```

このオプションを有効にすると次のようなエラーが発生します。

```typescript
error TS6133: 'message' is declared but its value is never read.

const message: string = `the sum is ${n1 + n2}`;
      ~~~~~~~
```

