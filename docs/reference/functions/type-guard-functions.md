# 型ガード関数 \(type guard function\)

Type predicateの宣言は戻り値が`boolean`型の関数に対して適用でき、戻り値の型の部分を次のように書き替えます。

```typescript
function isDuck(animal: Animal): animal is Duck {
  // ...
}
```

これで関数`isDuck()`が`true`を返す時の`if`のブロックの中では`animal`は`Duck`型として解釈されるようになります。

```typescript
if (isDuck(animal)) {
  animal.quacks();
  // ...
}
```

しかしながら、これはあくまでもその型であるとTypeScriptに解釈させるだけなので、JavaScriptとして正しいということは断言できません。

```typescript
function isUndefined(value: unknown): value is undefined {
  return typeof value === 'number';
}
```

上記関数`isUndefined()`は明らかに誤っていますが、この誤りに対してTypeScriptは何も警告を出しません。

## 関連情報

{% page-ref page="../statements/control-flow-analysis-and-type-guard.md" %}

