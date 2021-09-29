# noImplicitAny

型を明示しないとき、とくに引数の場合、TypeScriptはその引数を`any`型として解釈します。

```typescript
function increment(i) {
  return i + 1;
}
```

`any` 型ということは、この関数に値をを代入することはJavaScriptと同じようにいかなる型の値も代入ができてしまうということです。

```typescript
increment(1);
// -> 2
increment('1');
// -> '11'
increment(null);
// -> 1
increment(undefined);
// -> NaN
```

このオプションはこれを禁止するもので `any` 型となりうる型の非明示を避けます。

なお戻り値についてはTypeScriptは戻り値を推測することができるので明示する必要はありません。

```typescript
function increment(i: number) {
  return i + 1;
}
```

